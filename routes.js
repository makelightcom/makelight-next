const routes = (module.exports = require('next-routes')())

routes
  .add('articles', '/articles/:uid', 'article')
  .add('categories', '/articles/categories', 'category')
  .add('articles/categories', '/articles/categories/:uid', 'category')
  .add('courses/index', '/courses/', 'courses')
  .add('courses/show', '/courses/:uid', 'course')
  .add('courses/dashboard', '/courses/:uid/dashboard', 'course_dashboard')

  .add('pages', '/pages/:uid', 'page')
  .add('lessons', '/lessons/:uid', 'lesson')

  .add('about', '/pages/about', 'about')
  .add('membership')
  .add('podcasts')
  .add('podcasts/show', '/podcasts/:uid', 'podcast')
