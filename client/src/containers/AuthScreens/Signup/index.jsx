import { Image } from "antd";
import React, { useState } from "react";
import { colors } from "../../../constants";
import { Input, Text } from "../../../elements";
import Button from "../../../elements/Button";
import styles from "./Signup.module.css";
import signin from "../../../assets/artboard/cartoon.png";
import { useAuth } from "../../../hooks/UserContext";
import { validateEmail } from "../../../helpers";
import { Navigate, useNavigate } from "react-router-dom";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState({})
  const { signup } = useAuth();

  const navigate = useNavigate()
  const handleSubmit = async () => {


    if (firstName == '') {
      seterr({
        id: 0,
        message: 'email is incorrect !',
      });
      return;
    } else if (lastName == '') {
      seterr({
        id: 1,
        message: 'email is incorrect !',
      });
      return;
    } else if (!validateEmail(email)) {
      seterr({
        id: 2,
        message: 'email is incorrect !',
      });
      return;
    } else if (password == '' || password.length < 8) {
      seterr({
        id: 3,
        message: 'password should have atleast 8 characters !',
      });
      return;
    }
    setloading(true)
    seterr({})
    try {

      let res = await signup({
        name: firstName + " " + lastName,
        email: email,
        password: password,
      });

      setloading(false)
      console.log('line 41', res)
      if (res.err) {
        seterr({ id: 0 })
      }

    } catch (error) {
      setloading(false)

    }


  };
  return (
    <div className={"signin-container flex1 flex-row " + styles.signin}>
      <div

        className={
          "  flex-row  " +
          styles.imageContainer
        }
      >
        <div className="flex1 flex-col align-center justify-center">

          <Text weight={"600"} size={22}>
            Log in to
          </Text>
          <Text weight={"600"} size={22}>TradeTalk
          </Text>


        </div>
        <div className="flex-row justify-end align-end">

          <img src={signin} />
        </div>
      </div>

      <div className={" bg-grey flex-col justify-center " + styles.inputs}>
        <Text size={36} weight={500}>
          Sign up Now{" "}
        </Text>
        <div className="flex-row align-center">
          <Text size={21} weight={400}>
            Already have an Account ?
          </Text>
          <Text onClick={() => {
            navigate("/signin");
          }} size={17} weight={600} style={{ color: colors.primary }}>
            Sign in
          </Text>
        </div>
        <div style={{ margin: "30px 0px ", maxWidth: "600px" }}>
          <div className="inputWrapper">
            <Text size={17} weight={600} style={{ color: colors.textGrey }}>
              First Name
            </Text>
            <Input
              err={err.id == 0 && err}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              placeholder={"FirstName"}
            />
          </div>
          <div className="inputWrapper">
            <Text size={17} weight={600} style={{ color: colors.textGrey }}>
              Last Name
            </Text>
            <Input
              err={err.id == 1 && err}

              onChange={(e) => {
                setLastName(e.target.value);
              }}
              placeholder={"LastName"}
            />
          </div>
          <div className="inputWrapper">
            <Text size={17} weight={600} style={{ color: colors.textGrey }}>
              Email
            </Text>
            <Input
              err={err.id == 2 && err}

              onChange={(e) => {
                setemail(e.target.value);
              }}
              placeholder={"Email"}
            />
          </div>
          <div className="inputWrapper">
            <Text size={17} weight={600} style={{ color: colors.textGrey }}>
              Password
            </Text>
            <Input type="password"
              err={err.id == 3 && err}

              onChange={(e) => {
                setpassword(e.target.value);
              }}
              placeholder={"Password"}
            />
          </div>

          <Button loading={loading} onClick={handleSubmit}>Create Account</Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
