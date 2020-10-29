import React from "react";
import File from "./components/FileInput/File";
import Header from "./components/Tools/Header";
import Footer from "./components/Tools/Footer";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <File />
      <Footer />
    </div>
  );
};

export default App;
