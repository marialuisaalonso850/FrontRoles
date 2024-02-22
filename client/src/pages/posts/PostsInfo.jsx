import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import 'leaflet/dist/leaflet.css';
import config from "../../config.json";
import './info.css'


const PostInfo = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPostById = async () => {
            try {
                const res = await axios.get(`${config.apiUrl}/${id}`);
                setPost(res.data); // Asumiendo que la respuesta de la API contiene un objeto de poste directamente
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        fetchPostById();
    }, [id]);

    if (!post || post.latitud === undefined || post.longitud === undefined) {
        return <div>Loading...</div>;
    }

    const defaultCenter = [post.latitud, post.longitud];

    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/Reservas">Reserva</Link></li>
                    {/* Otros elementos de menú si es necesario */}
                </ul>
            </nav>

            <div className="container">
                <div className="info">
                    <h2>{post.title}</h2>
                    <p><strong>Dirección:</strong> {post.content}</p>
                    <p><strong>Nosotros:</strong> {post.nosotros}</p>
                    <p><strong>Horario:</strong> {post.horarios}</p>
                    <p><strong>Tarifa Carro:</strong> {post.tarifaCarro}</p>
                    <p><strong>Tarifa Moto:</strong> {post.tarifaMoto}</p>
                    <p><strong>Teléfono:</strong> {post.telefono}</p>
                </div>
                <div className="map">
                <MapContainer center={defaultCenter} zoom={12} style={{ height: '400px', width: '800px' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='© OpenStreetMap contributors'
                    />
                    <Marker position={defaultCenter}>
                        <Popup>
                            <div>
                                <strong>Parqueadero:</strong> {post.title}
                                <br />
                                <strong>Dirección:</strong> {post.content}
                                
                            </div>
                        </Popup>
                    </Marker>
                </MapContainer>
                </div>
            </div>
        </div>

    );
};

export default PostInfo;
