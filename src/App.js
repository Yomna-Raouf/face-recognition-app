import React, { useState } from "react";
import Clarifai from "clarifai";
import "./App.css";
import Particles from "react-tsparticles";
import Navbar from "./Components/Navbar/Navbar";
import Logo from "./Components/Logo/Logo";
import LinkForm from "./Components/LinkForm/LinkForm";
import Rank from "./Components/Rank/Rank";
import FaceRecognitionBox from "./Components/FaceRecognitionBox/FaceRecognitionBox";
import Signin from "./Components/SignIn/Signin";
import Register from "./Components/Register/Register";

const App = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signIn");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  /*  useEffect(() => {
    async function fetchData() {
      const request = await fetch("http://localhost:4000/");
      const response = await request.json();
      console.log(response);
      return request;
    }

    fetchData();
  }, []); */

  const app = new Clarifai.App({
    apiKey: "b2bc6d586d4a49edbbd61018780af9c5",
  });

  const ParticlesOptions = {
    fpsLimit: 60,
    interactivity: {
      detectsOn: "canvas",
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: false,
        speed: 3,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          value_area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
    },
    detectRetina: true,
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const displayBoxAroundFaces = (faceBox) => {
    setBox(faceBox);
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onImageSubmit = (e) => {
    e.preventDefault();
    setImageUrl(input);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response) => {
        displayBoxAroundFaces(calculateFaceLocation(response));
        if (response) {
          fetch("http://localhost:4000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((entriesCount) => {
              console.log(entriesCount);
              setUser({ ...user, entries: entriesCount });
            });
        }
      })
      .catch((err) => console.log(err));
  };

  const onRouteChange = (route) => {
    if (route === "signIn") {
      setIsSignedIn(false);
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="app">
      <Particles className="particles" params={ParticlesOptions} />
      <Navbar onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <>
          <Logo />
          <Rank name={user.name} rank={user.entries} />
          <LinkForm
            link={input}
            onInputChange={onInputChange}
            onImageSubmit={onImageSubmit}
          />
          <FaceRecognitionBox faceBox={box} imageURL={imageUrl} />
        </>
      ) : route === "signIn" ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
};

export default App;
