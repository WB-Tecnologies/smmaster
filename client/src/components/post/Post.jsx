import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { getSocialIcons } from '@/helpers/socialIcons';
import { formatDate } from '@/helpers/formatDate';
import {
  fetchPost,
  checkAccount,
  editDate,
  selectRubric,
} from '@/actions/postDetailsActions';

import { removePost } from '@/actions/contentPlanActions';

import Portal from '@/components/portal/Portal';
import Button from '@/components/button/Button';
import Checkbox from '@/components/checkbox/Checkbox';
import DateEditorCalendar from '@/components/calendar/date-editor-calendar/DateEditorCalendar';
import Select from '@/components/select/Select';
import Sample from '@/components/sample/Sample';
import Tooltip from '@/components/tooltip/Tooltip';
import ModalWindow from '@/components/modal-window/ModalWindow';

import cross from '!svg-url-loader?noquotes!../../../src/assets/Cross.svg';// eslint-disable-line import/no-webpack-loader-syntax

import './post.sass';

const MAX_ACCOUNT_TO_SHOW = 10;


class Post extends PureComponent {
  static propTypes = {
    fetchPost: PropTypes.func.isRequired,
    postDetails: PropTypes.shape({
      id: PropTypes.string,
      date: PropTypes.string,
      accounts: PropTypes.arrayOf(PropTypes.object),
    }),
    isLoading: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool,
    onCancel: PropTypes.func,
    checkAccount: PropTypes.func.isRequired,
    editDate: PropTypes.func.isRequired,
    selectRubric: PropTypes.func.isRequired,
    removePost: PropTypes.func.isRequired,
  };

  static defaultProps = {
    postDetails: {
      rubricColor: '#E3E7EB',
      accounts: [],
    },
    onCancel: () => {},
    isOpen: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpenModal: false,
    };

    this.socialIcons = getSocialIcons({ size: 16 });
  }

  componentDidMount() {
    const { fetchPost } = this.props;

    fetchPost();
  }

  handleCheck = id => {
    const { checkAccount } = this.props;

    checkAccount(id);
  }

  handleDate = date => {
    const { editDate } = this.props;

    editDate(date);
  }

  handleTime = date => {
    const { editDate } = this.props;

    editDate(date);
  }

  handleSelect = id => {
    const { selectRubric } = this.props;

    selectRubric(id);
  }

  handleRemovePost = () => {
    this.setState({ isOpenModal: true });
  }

  handleSubmitRemove = () => {
    const { postDetails: { id }, removePost, onCancel } = this.props;

    removePost(id);
    onCancel();
    this.setState({ isOpenModal: false });
  }

  handleCancelRemove = () => {
    this.setState({ isOpenModal: false });
  }

  renderModalWindow = () => {
    const { isOpenModal } = this.state;

    return (
      <ModalWindow
        title="Вы действительно хотите удалить публикацию?"
        isOpen={isOpenModal}
        onCancel={this.handleCancelRemove}
        onSubmit={this.handleSubmitRemove}
        labelCancel="Отмена"
        labelSubmit="Удалить"
      >
        Отменить это действие будет невозможно.
      </ModalWindow>
    );
  }

  renderSamples = samples => {
    return (
      samples.map(sample => (
        <Sample content={sample} key={sample.id} />
      ))
    );
  }

  renderSocialIcon = socialMedia => {
    if (socialMedia in this.socialIcons) {
      return <span className="post__account-social-icon">{this.socialIcons[socialMedia]}</span>;
    }
  };

  renderAccount = accounts => {
    const accountsIsLonger = accounts.length > MAX_ACCOUNT_TO_SHOW;
    const moreAccounts = accounts.length - MAX_ACCOUNT_TO_SHOW;
    accounts = accountsIsLonger ? accounts.slice(0, MAX_ACCOUNT_TO_SHOW) : accounts;

    return (
      <>
        {accounts.map(({
          id,
          avatar,
          socialMedia,
          isChecked,
        }) => (
          <li key={shortid.generate()} className="post__account">
            <Checkbox
              onChange={() => { this.handleCheck(id); }}
              id={id}
              isChecked={isChecked}
            >
              <img src={avatar} alt="implementer" className="post__account-img" />
              {this.renderSocialIcon(socialMedia)}
            </Checkbox>
          </li>
        ))}
        {accountsIsLonger && <li className="post__account"><div className="post__account-img_more">{`+${moreAccounts}`}</div></li>}
      </>
    );
  };

  renderPostContent = () => {
    const {
      onCancel,
      postDetails: {
        date,
        accounts,
        rubrics,
        samples,
      },
    } = this.props;

    // just for displey
    const hintPosition = {
      top: 150,
      left: 40,
    };

    return (
      <div className="post__container">
        <header className="post__header">
          <h2 className="post__title">Редактирование публикации</h2>
          <Button isGhostIcon onClick={onCancel} className="post__close-btn">
            <img src={cross} alt="close" />
          </Button>
        </header>
        <div className="post__accounts">
          {this.renderAccount(accounts)}
        </div>
        <div className="post__body">
          <main className="post__content">
            <p>text</p>
            <Tooltip position={hintPosition} isVisible content="Греция — государство на юге Европы, на Балканском полуострове. Граничит с Албанией, Македонией, Болгарией, Турцией." title="Возможно, причастие" />
          </main>
          <aside className="post__aside">
            <div className="post__publish">
              <h4 className="post__aside-title">Время публикации</h4>
              <DateEditorCalendar
                date={new Date(date)}
                onChange={this.handleDate}
                getFormatedDate={formatDate}
                format="full-date-long-weekday"
                className="post__publish-date"
              />
              <DateEditorCalendar
                date={new Date(date)}
                onChange={this.handleTime}
                className="post__publish-time"
                timeIntervals={60}
                timeFormat="HH:mm"
                showTimeSelect
                showTimeSelectOnly
                timeCaption="Время"
                getFormatedDate={() => 'HH:mm'}
              />
            </div>
            <div className="post__rubric">
              <h4 className="post__aside-title">Рубрика</h4>
              <Select headerTitle="Без рубрики" dotColor="#E3E7EB" list={rubrics} onClick={this.handleSelect} />
            </div>
            <div>Тема</div>
            <div className="post__samples">
              <h4 className="post__aside-title">Примеры</h4>
              {this.renderSamples(samples)}
            </div>
          </aside>
        </div>
        <footer className="post__footer">
          <Button isOutline onClick={this.handleRemovePost}>Удалить</Button>
          <div className="post__footer-btn-group">
            <Button isOutline onClick={onCancel} className="post__footer-btn-cancel">Отмена</Button>
            <Button isPrimary isPrimaryMd>Запланировать</Button>
          </div>
        </footer>
      </div>
    );
  }

  render() {
    const {
      isOpen,
      isLoading,
    } = this.props;

    return (
      <>
        {isOpen && (
          <Portal>
            <div className="post-overlay">
              <div className="post">
                {isLoading
                  ? <span className="post__spinner" />
                  : (this.renderPostContent())
                }
              </div>
            </div>
          </Portal>
        )}
        {this.renderModalWindow()}
      </>
    );
  }
}

const mapStateToProps = state => ({
  postDetails: state.postDetails.item,
  isLoading: state.postDetails.isLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchPost: () => dispatch(fetchPost()),
  checkAccount: id => dispatch(checkAccount(id)),
  editDate: date => dispatch(editDate(date)),
  selectRubric: id => dispatch(selectRubric(id)),
  removePost: id => dispatch(removePost(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
