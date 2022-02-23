import Sequelize from "sequelize";

class Hashtag extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(45),
          allowNull: false,
        },
        wordColor: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true,
        },
        backgroundColor: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Hashtag",
        tableName: "hashtags",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static assciate(db) {
    db.Hashtag.belongsToMany(db.Task, { through: "TaskHashtag" });
    db.Hashtag.belongsTo(db.User);
  }
}
export default Hashtag;
