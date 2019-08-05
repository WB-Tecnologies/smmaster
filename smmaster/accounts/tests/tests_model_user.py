from django.test import TestCase

from accounts.factories import UserFactory


class UserTestCase(TestCase):

    def test_readable_string(self):
        """ Should add first name, last name and email to readable string """
        user = UserFactory(first_name='John', last_name='Doe', email='test_user@e.co')
        self.assertEqual('John Doe <test_user@e.co>', str(user))
