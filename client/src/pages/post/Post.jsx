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
    if (id !== "new") {
      const fetchPost = async () => {
        try {
          const { data } = await axios.get(`${config.apiUrl}/${id}`);
          setPost(data);
        } catch (error) {
          console.error("Error al obtener el parqueadero:", error);
          navigate("/error"); // Redirige a una página de error en caso de error 500
        }
      };
      fetchPost();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const postClone = { ...post };
    postClone[e.target.name] = e.target.value;
    setPost(postClone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validación de campos requeridos
    if (!post.title || !post.content || !post.telefono || !post.latitud || !post.longitud || !post.puestos) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }
  
    // Validación de formato de teléfono
    const telefonoPattern = /^\d{10}$/;
    if (!telefonoPattern.test(post.telefono)) {
      alert('Por favor ingresa un número de teléfono válido (10 dígitos sin espacios ni caracteres especiales).');
      return;
    }
  
    // Validación de tarifas
    if (post.tarifaCarro < 0 || post.tarifaMoto < 0) {
      alert('Por favor ingresa tarifas válidas (no negativas).');
      return;
    }

    // Validación de longitud y latitud
  if (post.latitud < -90 || post.latitud > 90 || post.longitud < -180 || post.longitud > 180) {
    alert('Por favor ingresa valores válidos para la latitud (-90 a 90) y la longitud (-180 a 180).');
    return;
  }
  
     // Validación de tarifas
  if (post.tarifaCarro < 0 || post.tarifaMoto < 0) {
    alert('Por favor ingresa tarifas válidas (no negativas).');
    return;
  }
  
  try {
    const response = await axios.get(config.apiUrl, {
      params: {
        title: post.title,
        latitud: post.latitud,
        longitud: post.longitud
      }
    });
  
    // Verificar si la respuesta contiene algún parqueadero con los mismos datos
    const existingPost = response.data.find(existing => 
      existing.title === post.title && existing.latitud === post.latitud && existing.longitud === post.longitud
    );
  
    if (existingPost) {
      alert('Ya existe un parqueadero con el mismo nombre y coordenadas.');
      return;
    }
  
    // Envío del formulario si todas las validaciones son exitosas
    if (id === "new") {
      await axios.post(config.apiUrl, post);
    } else {
      await axios.put(`${config.apiUrl}/${id}`, post);
    }
    navigate("/Posts");
  } catch (error) {
    console.error("Error al guardar la reserva:", error);
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
              {id === 'new' ? 'Agregar' : 'Actualizar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;