import { Image } from "antd";
import React, { useState } from "react";
import { colors } from "../../../constants";
import { Input, Text } from "../../../elements";
import Button from "../../../elements/Button";
import styles from "./Signin.module.css";
import signin from "../../../assets/artboard/cartoon.png";
import { useAuth } from "../../../hooks/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { validateEmail } from "../../../helpers";

function Signin() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [err, seterr] = useState({});
  const [loading, setloading] = useState(false)
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleClick = async () => {

    if (!validateEmail(email)) {
      seterr({
        id: 0,
        message: 'email is incorrect !',
      });
      return;
    } else if (password == '' || password.length < 8) {
      seterr({
        id: 1,
        message: 'password should have atleast 8 characters !',
      });
      return;
    }
    setloading(true)
    seterr({})
    try {

      let res = await login({ email, password });

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
          Welcome .
        </Text>
        <Text size={25} weight={500}>
          Sign in
        </Text>
        <div style={{ margin: "30px 0px ", maxWidth: "600px" }}>
          <div className="inputWrapper">
            <Text size={17} weight={600} style={{ color: colors.textGrey }}>
              Email
            </Text>
            <Input
              err={err.id == 0 && err}
              value={email}
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
            <Input
              err={err.id == 1 && err}
              value={password}
              type="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              placeholder={"Password"}
            />
          </div>
          <div className="space10"></div>
          <Button loading={loading} onClick={handleClick}>Signin</Button>
          <div className="space10"></div>

          <div className="flex-row align-center justify-between">
            <Text size={13} weight={500}>
              Already have an Account ?
            </Text>
            <Text
              onClick={() => {
                navigate("/signup");
              }}
              size={15}
              weight={600}
              style={{ color: colors.primary }}
            >
              Sign up now
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
