import React, {useEffect} from "react";
import Alert from "../Components/Alert";
import Navbar from "../Navbar/Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EmptyCart } from "../Actions/CartActions";
import { useDispatch, useSelector } from "react-redux";
import server from "../apis/server";
import { View, Text} from "react-native";
import { RadioButton } from 'react-native-paper';
import {
  TextInput,   
  Button,
  Caption,
  Headline, 
  Portal,
} from "react-native-paper"; 
import { Formik } from "formik";
import * as yup from "yup";
// import { useEffect } from "react";
export default function Checkout({ navigation,route }) {
  const [visible, setVisible] = React.useState(false);
  const [orderRef, setOrderRef] = React.useState();
  const [cartItems, setCartItems] = React.useState([]);
  const [value, setValue] = React.useState('Home Delivery');
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
     const { totalPrice } = route.params;

  let validationSchema = yup.object({
    firstName: yup.string().required("first name is required"),
    lastName: yup.string().required("last name is required"),
    contactDetails: yup
      .number()
      // .max(11)
      .min(11)
      .required("Phone number is required"),
    shippingAddress: yup.string().required("Address is required"),
    city: yup.string().required("enter the city"),
    province: yup.string().notRequired("Enter your province"),
  });

  useEffect(() => {
    let cartArrayForBackend = [];

    // alert(JSON.stringify(cart))
    for (let prods of cart) {
 

 
       
      // alert(JSON.stringify(prods))
      // delete prods.product;
       cartArrayForBackend.push(prods);
      // }
    }
    setCartItems(cartArrayForBackend);
  }, []);

  const handleCheckout = (values, resetForm) => {
    // const data = { ...values, cartItems: cartItems,deliveryType:value,total:totalPrice};
    //  alert(JSON.stringify(data))
    
    AsyncStorage.getItem("hamzaFlawsToken")
    .then((res) => {
      const token = res;
 
      if (!token) {
        return navigation.navigate("Login");
      }

    AsyncStorage.getItem("hamzaFlawsUser").then((res) => {

      const user =  JSON.parse(res)
       alert(JSON.stringify(user)) 
      const data = { ...values, cartItems: cartItems,deliveryType:value,total:totalPrice,userID:user._id};

      navigation.navigate("paypall", {
        totalPrice: totalPrice,
        data:data
        // }); 
    });
   })

  })


   
    







    //   if (!res) {
    //     return navigation.navigate("Login");
    //   }
    //   server
    //     .post("/checkout", data, {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${res}`,
    //       },
    //     })
    //     .then((res) => {
    //       dispatch(EmptyCart());
    //       setOrderRef(res.data.data.orderRef);
    //       setVisible(true);
    //       resetForm({
    //         values: "",
    //       });
    //     })
    //     .catch((e) => {
    //       setError(true);
    //       alert(e.message);
    //       console.log(e);
    //     });
    // });
  };

  return (
    <>
      <Navbar navigation={navigation} />
      <Portal.Host>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: "white",
          }}
        >
          <Headline style={{ marginBottom: 10 }}>
            Enter Order Details
          </Headline>
          <Formik
            initialValues={{  
              firstName: "",
              lastName: "",
              contactDetails: "",
              shippingAddress: "",
              city: "",
              province: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleCheckout(values, resetForm);
            }}
          >
            {(formikProps) => (
              <>
                <TextInput
                  id="firstname"
                  name="firstName"
                  label="FirstName"
                  mode="outlined"
                  dense
                  value={formikProps.values.firstName}
                  onChangeText={formikProps.handleChange("firstName")}
                  style={{ width: "95%" }}
                  onBlur={formikProps.handleBlur("firstName")}
                  error={
                    formikProps.errors.firstName &&
                    formikProps.touched.firstName
                      ? true
                      : false
                  }
                />
                <View style={{ width: "95%" }}>
                  {formikProps.errors.firstName &&
                  formikProps.touched.firstName ? (
                    <Caption style={{ color: "red" }}>
                      {formikProps.errors.firstName}
                    </Caption>
                  ) : (
                    <Caption style={{ display: "none" }}></Caption>
                  )}
                </View>
                <TextInput
                  id="lastName"
                  lastName="lastName"
                  label="LastName"
                  mode="outlined"
                  dense
                  value={formikProps.values.lastName}
                  onChangeText={formikProps.handleChange("lastName")}
                  style={{ width: "95%" }}
                  onBlur={formikProps.handleBlur("lastName")}
                  error={
                    formikProps.errors.lastName && formikProps.touched.lastName
                      ? true
                      : false
                  }
                />
                <View style={{ width: "95%" }}>
                  {formikProps.errors.lastName &&
                  formikProps.touched.lastName ? (
                    <Caption style={{ color: "red" }}>
                      {formikProps.errors.lastName}
                    </Caption>
                  ) : (
                    <Caption style={{ display: "none" }}></Caption>
                  )}
                </View>

                <TextInput
                  id="contactDetails"
                  name="contactDetails"
                  label="Phone Number"
                  mode="outlined"
                  dense
                  value={formikProps.values.contactDetails}
                  onChangeText={formikProps.handleChange("contactDetails")}
                  style={{ width: "95%" }}
                  onBlur={formikProps.handleBlur("contactDetails")}
                  error={
                    formikProps.errors.contactDetails &&
                    formikProps.touched.contactDetails
                      ? true
                      : false
                  }
                />

                <View style={{ width: "95%" }}>
                  {formikProps.errors.contactDetails &&
                  formikProps.touched.contactDetails ? (
                    <Caption
                      style={{
                        color: "red",
                      }}
                    >
                      {formikProps.errors.contactDetails}
                    </Caption>
                  ) : (
                    <Caption style={{ display: "none" }}></Caption>
                  )}
                </View>

                <TextInput
                  id=" shippingAddress"
                  name=" shippingAddress"
                  label="Address"
                  multiline
                  mode="outlined"
                  dense
                  value={formikProps.values.shippingAddress}
                  onChangeText={formikProps.handleChange("shippingAddress")}
                  style={{ width: "95%" }}
                  onBlur={formikProps.handleBlur("shippingAddress")}
                  error={
                    formikProps.errors.shippingAddress &&
                    formikProps.touched.shippingAddress
                      ? true
                      : false
                  }
                  // eye-off-outline
                />
                <View style={{ width: "95%" }}>
                  {formikProps.errors.shippingAddress &&
                  formikProps.touched.shippingAddress ? (
                    <Caption style={{ color: "red" }}>
                      {formikProps.errors.shippingAddress}
                    </Caption>
                  ) : (
                    <Caption style={{ display: "none" }}></Caption>
                  )}
                </View>

                {/* two columns */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    // justifyContent: "center",
                    // alignContent: "center",
                  }}
                >
                  <View style={{ width: "48%" }}>
                    <TextInput
                      id="city"
                      name="city"
                      label="City"
                      multiline
                      mode="outlined"
                      dense
                      value={formikProps.values.city}
                      onChangeText={formikProps.handleChange("city")}
                      style={{ width: "95%" }}
                      onBlur={formikProps.handleBlur("city")}
                      error={
                        formikProps.errors.city && formikProps.touched.city
                          ? true
                          : false
                      }
                      // eye-off-outline
                    />
                    <View style={{ width: "95%" }}>
                      {formikProps.errors.city && formikProps.touched.city ? (
                        <Caption style={{ color: "red" }}>
                          {formikProps.errors.city}
                        </Caption>
                      ) : (
                        <Caption style={{ display: "none" }}></Caption>
                      )}
                    </View>
                  </View>
                  <View style={{ width: "48%" }}>
                    <TextInput
                      id="province"
                      name="province"
                      label=""
                      multiline
                      mode="outlined"
                      dense
                      value={formikProps.values.province}
                      onChangeText={formikProps.handleChange("province")}
                      style={{ width: "95%" }}
                      onBlur={formikProps.handleBlur("province")}
                      error={
                        formikProps.errors.province &&
                        formikProps.touched.province
                          ? true
                          : false
                      }
                      // eye-off-outline
                    />
                    <View style={{ width: "95%" }}>
                      {formikProps.errors.province &&
                      formikProps.touched.province ? (
                        <Caption style={{ color: "red" }}>
                          {formikProps.errors.province}
                        </Caption>
                      ) : (
                        <Caption style={{ display: "none" }}></Caption>
                      )}
                    </View>
                  </View>


                </View>

                <View style={{
                   display: "flex",
                   flexDirection: "row",
                   alignItems: "flex-start",
                }}>
     <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      <View> 
        <Text>Home Delivery</Text>
        <RadioButton value="Home Delivery" />
      </View>
      <View>
        <Text>Take Away</Text>
        <RadioButton value="Take Away" />
      </View>
    </RadioButton.Group>
    </View> 

                <Button
                  style={{ marginTop: 10, borderRadius: 50 }}
                  mode="contained"
                  onPress={formikProps.handleSubmit}
                  type="submit"
                  onPress={formikProps.handleSubmit}
                >
                  Order Now !
                </Button>
              </>
            )}
          </Formik>
        </View>
        <Alert
          visible={visible}
          setVisible={setVisible}
          orderRef={orderRef}
          navigation={navigation}
        />
      </Portal.Host>
    </>
  );
}
