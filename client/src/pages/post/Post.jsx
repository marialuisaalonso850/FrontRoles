// Post.js
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../assets/post.css'; 
import config from '../../config.json';

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({
    title: '',
    content: '',
    longitud: '',
    latitud: '',
    puestos: '',
  });

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      const { data } = await axios.get(`${config.apiUrl}/${id}`);
      setPost(data);
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const postClone = { ...post };
    postClone[e.target.name] = e.target.value;
    setPost(postClone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.post(config.apiUrl, post);
      return navigate('/Posts');
    } else {
      await axios.put(`${config.apiUrl}/${id}`, post);
      return navigate('/Posts');
    }
  };

  return (
    <div className="post__wrapper">
      <div className="container">
        <div className="post-container">
          <div className="post-image">
            <img
              src="https://img.freepik.com/fotos-premium/antiguo-reloj-arena-fondo-hojas-otono-renderizado-3d_856795-5197.jpg"
              alt="Post Image"
              className="image"
            />
          </div>
          <form className="post-form">
            <input
              type="text"
              placeholder="Nombre..."
              name="title"
              value={post.title}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Descripción..."
              name="content"
              value={post.content}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Horario..."
              name="horarios"
              value={post.horarios}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Tarifa carro 1h..."
              name="tarifaCarro"
              value={post.tarifaCarro}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Tarifa moto 1h..."
              name="tarifaMoto"
              value={post.tarifaMoto}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Teléfono..."
              name="telefono"
              value={post.telefono}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Sobre nosotros.."
              name="nosotros"
              value={post.nosotros}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Latitud..."
              name="latitud"
              value={post.latitud}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Longitud..."
              name="longitud"
              value={post.longitud}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Puestos..."
              name="puestos"
              value={post.puestos}
              onChange={handleChange}
            />
            <button onClick={handleSubmit} className="btn btn-primary">
              {id ? 'Agregar' : 'Actualizar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
