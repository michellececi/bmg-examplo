module.exports = (sequelize, DataTypes) => {
  const Withdrawals = sequelize.define(
    "Withdrawals",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_company_network: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "company_networks",
          key: "id",
        },
      },
      id_balance_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "balance_users",
          key: "id",
        },
      },
      id_bank_account: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "bank_accounts",
          key: "id",
        },
      },
      id_zoop: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      succeed_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      failed_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "withdrawals",
    }
  );

  Withdrawals.associate = function (models) {
    //criar as associações
  };
  return Withdrawals;
};
