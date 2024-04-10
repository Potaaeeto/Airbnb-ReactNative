import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import des composants
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";

// une fonction qui retourne un objet dans lequel on trouve les propriétés Navigator et Screen
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  // state pour le rafraichissement de la page afin de checker s'il ya un token dans la mémoire du tel
  const [userToken, setUserToken] = useState(null);

  // Des le chargement de la page, on veut savoir si on est sur la page SignUp ou SignIn OU si on est sur la page Home. Donc le token nous permet de savoir si le user est déjà authentifié ou pas

  const setToken = async (token) => {
    // Si le token n'est pas falsy
    if (token) {
      // on enregistre le token dans la clé userToken
      await AsyncStorage.setItem("userToken", token);
    } else {
      // si c'est undefined ou null, on va supprimer le token associé à la clé userToken
      await AsyncStorage.removeItem("userToken");
    }

    // Que le token soit défini ou non, il va mettre a jour l'état de l'application avec le nouveau token (soit c défini soit ca va etre null)
    setUserToken(token);
  };

  // charger le userToken depuis le stockage lorsque que le composant est monté pour la premiere fois, puis maj l'application.
  useEffect(() => {
    const bootstrapAsync = async () => {
      // on demande a la boite magique useEffect() de nous donner le userToken à partir du stockage
      const userToken = await AsyncStorage.getItem("userToken");
      // console.log(userToken);

      // Maintenant qu'on a le userToken, on va le donner a une autre partie de l'application (App Screen ou Auth screen), pour qu'elle sache quel user est connecté
      setUserToken(userToken);

      // lApp n'a plus besoin de se charger, car elle a toute les infos
      setIsLoading(false);
    };

    // on exécute la fonction
    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    // Conteneur de tous les écrans, contient toute la navigation
    <NavigationContainer>
      {/* Permet de naviguer entre plusieurs ecrans */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="SignIn">
              {/* {navigation: {},route:{}} route={{son contenu}} navigation={{son contenu}}        */}
              {(props) => (
                <SignInScreen
                  {...props}
                  navigation={props.navigation}
                  setToken={setToken}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {(props) => (
                <SignUpScreen
                  {...props}
                  navigation={props.navigation}
                  setToken={setToken}
                />
              )}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
