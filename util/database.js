const Sequelize = require('sequelize')
const sequelize = new Sequelize('node-complete', 'root', 'illusion0213tse', {
  dialect: 'mysql',
  host: 'localhost'
})
module.exports = sequelize



