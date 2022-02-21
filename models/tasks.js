import Sequelize from "sequelize";

class Task extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: sequelize.NOW,
        },
        editedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        targetDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        finishDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        clear: {
          type: Sequelize.TINYINT,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Task",
        tableName: "tasks",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Task.belongsToMany(db.Hashtag, { through: "TaskHashtag" });
    db.Task.belongsTo(db.User, { foreignKey: "id" });
  }
}
export default Task;
