import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// eslint-disable-next-line import/no-extraneous-dependencies
import Countable from 'countable';

import { getSocialIcons } from '@/helpers/socialIcons';
import { getWordDeclension } from '@/helpers/declensions';
import { formatDate } from '@/helpers/formatDate';
import {
  fetchPost,
  checkAccount,
  editDate,
  selectRubric,
  editTitle,
  loadImage,
  removeImage,
  editPostText,
} from '@/actions/postDetailsActions';

import { removePost } from '@/actions/contentPlanActions';

import Portal from '@/components/portal/Portal';
import Button from '@/components/button/Button';
import Checkbox from '@/components/checkbox/Checkbox';
import DateEditorCalendar from '@/components/calendar/date-editor-calendar/DateEditorCalendar';
import ImageDropLoader from '@/components/image-drop-loader/ImageDropLoader';
import TextEditor from '@/components/text-editor/TextEditor';
import Select from '@/components/select/Select';
import Sample from '@/components/sample/Sample';
import ModalWindow from '@/components/modal-window/ModalWindow';

import cross from '!svg-url-loader?noquotes!../../../src/assets/Cross.svg';// eslint-disable-line import/no-webpack-loader-syntax
import whiteCross from '!svg-url-loader?noquotes!../../../src/assets/white-cross.svg';// eslint-disable-line import/no-webpack-loader-syntax

import './post.sass';

const MAX_ACCOUNT_TO_SHOW = 10;
const MAX_IMAGE_AMOUNT_ALLOWD = 10;

class Post extends PureComponent {
  static propTypes = {
    fetchPost: PropTypes.func.isRequired,
    postDetails: PropTypes.shape({
      id: PropTypes.string,
      date: PropTypes.string,
      accounts: PropTypes.arrayOf(PropTypes.object),
      attachments: PropTypes.arrayOf(PropTypes.object),
    }),
    isLoading: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool,
    onCancel: PropTypes.func,
    checkAccount: PropTypes.func.isRequired,
    editDate: PropTypes.func.isRequired,
    selectRubric: PropTypes.func.isRequired,
    editTitle: PropTypes.func.isRequired,
    removePost: PropTypes.func.isRequired,
    loadImage: PropTypes.func.isRequired,
    removeImage: PropTypes.func.isRequired,
    editPostText: PropTypes.func.isRequired,
    id: PropTypes.string,
  };

  static defaultProps = {
    postDetails: {
      rubricColor: '#E3E7EB',
      accounts: [],
      attachments: [],
    },
    onCancel: () => {},
    isOpen: false,
    id: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpenModal: false,
      hints: [],
    };

    this.socialIcons = getSocialIcons({ size: 16 });
  }

  componentDidMount() {
    const { fetchPost, id } = this.props;

    fetchPost(id);
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

  handleTitle = ({ target: { value } }) => {
    const { editTitle } = this.props;

    editTitle(value);
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

  handleAttachment = id => {
    const { removeImage } = this.props;

    removeImage(id);
  }

  isShowImageLoader = attachments => attachments.length < MAX_IMAGE_AMOUNT_ALLOWD;

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

  renderImages = attachments => (
    attachments.map(({ path, alt, id }) => (
      path && (
        <div key={id} className="post__attachment">
          <img src={path} alt={alt} className="post__attachment-img" />
          <Button isGhostIcon onClick={() => { this.handleAttachment(id); }} className="post__attachment-btn">
            <img src={whiteCross} alt="close" />
          </Button>
        </div>
      )
    ))
  )

  renderStopWords = hints => {
    const count = hints.length;
    const declension = getWordDeclension(count, 'word');

    return `${count} стоп-${declension}. `;
  }

  getUniqueHints = hints => {
    const aux = {};
    return hints.reduce((uniqueHints, { hint: { name } }) => {
      if (!aux[name]) {
        aux[name] = 1;
        uniqueHints.push(name);
      }
      return uniqueHints;
    }, []);
  }

  renderStopWordsDescription = hints => {
    const uniqueHints = this.getUniqueHints(hints);

    return uniqueHints.map(name => (
      <span key={shortid.generate()} className="post__info-stop-words-description">{name}</span>
    ));
  }

  getDataFromChildComponent = hints => {
    this.setState({ hints });
  }

  renderPostContent = () => {
    const {
      onCancel,
      postDetails: {
        date,
        accounts,
        text,
        rubrics,
        samples,
        title,
        attachments,
      },
      loadImage,
      editPostText,
    } = this.props;
    const { hints } = this.state;

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
            <div className="post__text-editor">
              <TextEditor
                text={text}
                editPostText={editPostText}
                getDataFromChildComponent={this.getDataFromChildComponent}
              />
            </div>
            <div className="post__content-footer">
              <div className="post__attachments">
                {this.renderImages(attachments)}
                {this.isShowImageLoader(attachments) && <ImageDropLoader loadImage={loadImage} className="post__attachment" />}
              </div>
              <div className="post__info">
                <div className="post__info-counter">
                  {this.getCountInfo(text)}
                </div>
                <div className="post__info-stop-words">
                  <span>{this.renderStopWords(hints)}</span>
                  <span>Основные проблемы: </span>
                  <span>{this.renderStopWordsDescription(hints)}</span>
                </div>
              </div>
            </div>
          </main>
          <aside className="post__aside">
            <div className="post__publish">
              <h4 className="post__aside-title">Время публикации</h4>
              <DateEditorCalendar
                date={new Date(date)}
                onChange={this.handleDate}
                getFormatedDate={formatDate}
                minDate={new Date()}
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
            <div className="post__theme">
              <h4 className="post__aside-title">Тема</h4>
              <input className="post__theme-input" type="text" onBlur={this.handleTitle} defaultValue={title} />
            </div>
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

  getCountInfo = text => {
    const sentences = this.getSentenceCount(text);
    const words = this.getWordsCount(text);
    const characters = this.getCharactersCount(text);

    return (
      <>
        {`${sentences}`}
        <br />
        {`${words}, ${characters}`}
      </>
    );
  }

  getSentenceCount = text => {
    let count;
    Countable.count(text, counter => {
      count = counter.sentences;
    });
    const declension = getWordDeclension(count, 'sentense');

    return `${count} ${declension}`;
  }

  getWordsCount = text => {
    let count;
    Countable.count(text, counter => {
      count = counter.words;
    });
    const declension = getWordDeclension(count, 'word');

    return `${count} ${declension}`;
  }

  getCharactersCount = text => {
    let count;
    Countable.count(text, counter => {
      count = counter.characters;
    });
    const declension = getWordDeclension(count, 'character');

    return `${count} ${declension}`;
  }

  render() {
    const {
      isOpen,
      isLoading,
    } = this.props;

    return (
      <>
        <TransitionGroup component={null}>
          {isOpen && (
            <CSSTransition classNames="post" timeout={500} unmountOnExit>
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
            </CSSTransition>
          )}
        </TransitionGroup>
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
  editTitle: title => dispatch(editTitle(title)),
  removePost: id => dispatch(removePost(id)),
  loadImage: img => dispatch(loadImage(img)),
  removeImage: id => dispatch(removeImage(id)),
  editPostText: text => dispatch(editPostText(text)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);
