import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// eslint-disable-next-line space-before-function-paren
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  window.scrollTo(0, 0)
  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
