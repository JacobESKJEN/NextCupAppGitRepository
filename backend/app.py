from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from werkzeug.utils import secure_filename

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql://root:''@localhost/flasknextcup'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Feed(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.Text())
    date = db.Column(db.DateTime, default = datetime.datetime.now)
    pastDueDate = db.Column(db.String(100))
    adress = db.Column(db.String(100))

    def __init__(self, title, description, pastDueDate, adress):
        self.title = title
        self.description = description
        self.pastDueDate = pastDueDate
        self.adress = adress
class ArticleSchema(ma.Schema):
    class Meta:
        fields=("id", "title", "description", "date", "pastDueDate", "adress")

article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)

@app.route("/get", methods=["GET"])
def get_posts():
    all_posts = Feed.query.all()
    results = articles_schema.dump(all_posts)
    return jsonify(results)

@app.route("/get/<id>/", methods=["GET"])
def get_post(id):
    article=Feed.query.get(id)
    return article_schema.jsonify(article)

@app.route("/add", methods=["POST"])
def add_post():
    title = request.json["title"]
    description = request.json["description"]
    past_due_date = request.json["pastDueDate"]
    adress = request.json["adress"]

    articles = Feed(title, description, past_due_date, adress)
    db.session.add(articles)
    db.session.commit()
    return article_schema.jsonify(articles)

@app.route("/delete/<id>/", methods=["DELETE"])
def remove_post(id):
    article = Feed.query.get(id)
    db.session.delete(article)
    db.session.commit()
    return article_schema.jsonify(article)

if __name__ == "__main__":
    app.run(host="192.168.137.31", port=3000, debug=True)