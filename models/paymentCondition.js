module.exports = (sequelize, DataTypes) => {
    const PaymentCondition = sequelize.define('PaymentCondition', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Adicione mais campos conforme necessário
    });
  
    return PaymentCondition;
  };
  