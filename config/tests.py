from django.test import RequestFactory, TestCase
from .views import HomeView

class HomeViewTest(TestCase):

    def test_page_set_in_context(self):
        request = RequestFactory().get('/')
        view = HomeView()
        view.setup(request)

        context = view.get_context_data()
        self.assertIn('page', context)
        
