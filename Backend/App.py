import os
import pymysql
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  
from werkzeug.security import generate_password_hash, check_password_hash

pymysql.install_as_MySQLdb()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

DB_USER = os.environ.get('DB_USER', 'xxx')
DB_PASS = os.environ.get('DB_PASS', 'xxx')
DB_HOST = os.environ.get('DB_HOST', 'xxx')
DB_NAME = os.environ.get('DB_NAME', 'xxx')

app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}/{DB_NAME}"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    liked_movies = db.relationship('LikedMovie', backref='user', lazy=True)

class LikedMovie(db.Model):
    __tablename__ = 'liked_movie'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    movie_id = db.Column(db.Integer, nullable=False)

@app.route('/')
def index():
    return jsonify({'message': 'Działa'})

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    liked = data.get('likedMovies', [])

    if not all([name, email, password]):
        return jsonify({'error': 'name, email and password are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 400

    pw_hash = generate_password_hash(password)
    user = User(name=name, email=email, password_hash=pw_hash)
    db.session.add(user)
    db.session.commit()

    for mid in liked:
        lm = LikedMovie(user_id=user.id, movie_id=mid)
        db.session.add(lm)
    db.session.commit()

    return jsonify({'message': 'User created', 'userId': user.id}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'error': 'Nieprawidłowe dane'}), 401
    liked = [lm.movie_id for lm in user.liked_movies]
    return jsonify({
      'userId': user.id,
      'name': user.name,
      'email': user.email,
      'likedMovies': liked
    })

@app.route('/user/<int:user_id>/likes', methods=['GET'])
def get_likes(user_id):
    user = User.query.get_or_404(user_id)
    liked = [lm.movie_id for lm in user.liked_movies]
    return jsonify({'userId': user_id, 'likedMovies': liked})

@app.route('/user/<int:user_id>/likes', methods=['POST'])
def add_like(user_id):
    data = request.get_json() or {}
    movie_id = data.get('movieId')
    if movie_id is None:
        return jsonify({'error': 'movieId is required'}), 400

    exists = LikedMovie.query.filter_by(user_id=user_id, movie_id=movie_id).first()
    if not exists:
        lm = LikedMovie(user_id=user_id, movie_id=movie_id)
        db.session.add(lm)
        db.session.commit()

    return jsonify({'ok': True}), 201

@app.route('/user/<int:user_id>/likes/<int:movie_id>', methods=['DELETE'])
def remove_like(user_id, movie_id):
    lm = LikedMovie.query.filter_by(user_id=user_id, movie_id=movie_id).first()
    if not lm:
        return jsonify({'error': 'Like not found'}), 404

    db.session.delete(lm)
    db.session.commit()
    return jsonify({'ok': True}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
