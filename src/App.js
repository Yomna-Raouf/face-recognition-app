import React, { useState } from "react";
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
    const clarifaiFacesData = data.outputs[0].data.regions;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    const clarifaiFaces = clarifaiFacesData.map((clarifaiFace) => {
      clarifaiFace = {
        leftCol: clarifaiFace.region_info.bounding_box.left_col * width,
        topRow: clarifaiFace.region_info.bounding_box.top_row * height,
        rightCol:
          width - clarifaiFace.region_info.bounding_box.right_col * width,
        bottomRow:
          height - clarifaiFace.region_info.bounding_box.bottom_row * height,
      };
      return clarifaiFace;
    });

    return clarifaiFaces;
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
    fetch("https://enigmatic-basin-52522.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://enigmatic-basin-52522.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((entriesCount) => {
              setUser({ ...user, entries: entriesCount });
            })
            .catch((err) => alert("unable to work with API"));
        }
        displayBoxAroundFaces(calculateFaceLocation(response));
      })
      .catch((err) =>
        alert(
          "Please Enter a valid image url that ends with .png or .jpeg or .jpg or any valid image extension or try again later"
        )
      );
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setInput("");
      setImageUrl("");
      setBox({});
      setRoute("signIn");
      setIsSignedIn(false);
      setUser({
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      });
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
