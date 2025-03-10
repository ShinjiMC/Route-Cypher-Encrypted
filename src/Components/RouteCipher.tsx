import React, { useState } from "react";
// Importamos la función decrypt del archivo JS
// @ts-ignore
import { encrypt } from "./js_route/code";

const RouteCipher: React.FC = () => {
  // Estados para almacenar los valores del formulario
  const [choice, setChoice] = useState<string>("1");
  const [pathType, setPathType] = useState<string>("clockwise");
  const [routeSize, setRouteSize] = useState<number>(4);
  const [plainText, setPlainText] = useState<string>("hello world");
  const [result, setResult] = useState<string>("");
  const [parallelepiped, setParallelepiped] = useState<string>("");

  const handlePathTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPath = e.target.value;
    setPathType(selectedPath);

    // Cambia choice dependiendo de la opción seleccionada
    switch (selectedPath) {
      case "clockwise":
        setChoice("1");
        break;
      case "anticlockwise":
        setChoice("2");
        break;
      case "Spiraling inside out":
        setChoice("3");
        break;
      case "Top-to-Bottom":
        setChoice("4");
        break;
      default:
        setChoice("1");
    }
  };

  const adjustPlainText = (text: string, cols: number) => {
    const rows = Math.ceil(text.length / cols);
    const totalCells = rows * cols;

    // Si la longitud del texto es menor que el número total de celdas, rellenamos con guiones
    if (text.length < totalCells) {
      return text.padEnd(totalCells, "-");
    }
    return text;
  };

  // Función que maneja el submit del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adjustedText = adjustPlainText(plainText, routeSize);
    // Llamamos a la función decrypt y almacenamos el resultado
    const { encryptedText, parallelepipedRepresentation } = encrypt(
      choice,
      pathType,
      routeSize,
      adjustedText
    );
    setResult(encryptedText);
    setParallelepiped("");
    setParallelepiped(parallelepipedRepresentation);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        // fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "28px",
          marginBottom: "20px",
          color: "#000",
        }}
      >
        Route Cipher Decryptor
      </h1>
      <form
        onSubmit={handleSubmit}
        // style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              color: "#555",
              fontSize: "16px",
            }}
          >
            Path Type:
          </label>
          <select
            value={pathType}
            onChange={handlePathTypeChange}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="clockwise">Clockwise</option>
            <option value="anticlockwise">Anticlockwise</option>
          </select>
        </div>
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              color: "#555",
              fontSize: "16px",
            }}
          >
            Route Size:
          </label>
          <input
            type="number"
            value={routeSize}
            onChange={(e) => setRouteSize(parseInt(e.target.value))}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              color: "#555",
              fontSize: "16px",
            }}
          >
            Texto Plano:
          </label>
          <input
            type="text"
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              boxSizing: "border-box",
              fontSize: "16px",
              height: "80px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
              outline: "none",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button
            type="submit"
            style={{
              cursor: "pointer",
              padding: "10px 40px",
              margin: "10px",
              backgroundColor: "#646fe5",
              transition: "transform 0.2s ease-in-out", // Animación suave
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            } // Agranda un 5% al pasar el mouse
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} // Vuelve al tamaño normal al quitar el mouse
          >
            Encrypt
          </button>
        </div>
      </form>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2 style={{ color: "#333", fontSize: "20px" }}>Encrypted Text:</h2>
          <p
            style={{
              backgroundColor: "#e7f3fe",
              padding: "10px",
              borderRadius: "4px",
              color: "#31708f",
            }}
          >
            {result}
          </p>
        </div>
      )}
      {parallelepiped && (
        <div style={{ marginTop: "20px" }}>
          <h2 style={{ color: "#333", fontSize: "20px" }}>
            Parallelepiped Representation:
          </h2>
          <pre
            style={{
              backgroundColor: "#f1f1f1",
              padding: "10px",
              borderRadius: "4px",
              overflow: "auto",
            }}
          >
            {parallelepiped}
          </pre>
        </div>
      )}
    </div>
  );
};

export default RouteCipher;
