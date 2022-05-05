const Router = require('express')
const router = new Router()

router.post('/', )
router.get('/', (req, res) => {
    res.json({message: 'all working'})
})

module.exports = router