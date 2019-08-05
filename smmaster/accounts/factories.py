import factory

from accounts.models import User


class BaseUserFactory(factory.DjangoModelFactory):

    class Meta:
        model = User

    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    email = factory.Sequence(lambda n: 'user_{}@e.co'.format(n))
    username = factory.Sequence(lambda n: 'username_{}'.format(n))


class UserFactory(BaseUserFactory):

    is_staff = False
    is_superuser = False


class SuperUserFactory(BaseUserFactory):

    is_staff = True
    is_superuser = True
