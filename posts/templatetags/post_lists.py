import re
from django import template
from posts.models import Post

register = template.Library()


class PostListNode(template.Node):

    def __init__(self, var_name):
        self.var_name = var_name

    def render(self, context):
        my_months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                     'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        arch = Post.objects.dates('publish', 'month', order='DESC')

        archives = {}
        for i in arch:
            year = i.year
            month = i.month
            if year not in archives:
                archives[year] = {}
                archives[year][month] = my_months[month - 1]
            else:
                if month not in archives[year]:
                    archives[year][month] = my_months[month - 1]

        context[self.var_name] = sorted(archives.items(), reverse=True)
        return ''


@register.tag
def get_post_list(parser, token):
    """
    Generates a list of months that blog posts exist.
    Much like the 'year' archive.

    Syntax::

      {% get_post_list as [var_name] %}

    Example usage::
    {% get_post_list as posts_list %}

    {% for years, months in posts_list %}
        {{ years }}
        {% for month_number, month_name in months.items %}
            <li>
            <a href="{{ years }}/{{ month_name|lower }}/">{{ month_name }}</a>
            </li>
        {% endfor %}
        <br />
    {% endfor %}

    {% get_post_list as posts_list %}
    (This 'var_name' is the one inserted into the Node)

    """
    try:
        tag_name, arg = token.contents.split(None, 1)
    except ValueError:
        raise template.TemplateSyntaxError("%s tag requires arguments" % token.contents.split()[0])

    var = re.search(r'as (\w+)', arg)
    if not var:
        raise template.TemplateSyntaxError("%s tag had invalid arguments" % tag_name)

    var_name = var.groups()[0]
    return PostListNode(var_name)
