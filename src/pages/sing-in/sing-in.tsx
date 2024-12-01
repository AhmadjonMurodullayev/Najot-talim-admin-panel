import { Layout, Typography, Button, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { useLogin } from "./mutate/useLogin";
import { NajotTalim } from "../../assets/icons/najot-talim";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

interface LoginFormValues {
  login: string;
  password: string;
}

export const SingIn = () => {
  const { mutate } = useLogin();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
    mutate(data, {
      onSuccess: () => {
        message.success("Login successful");
        navigate("/app");
      },
    });

    console.log(data);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Layout>
        <Content
          style={{ display: "flex", flexDirection: "row", height: "100%" }}
        >
          <div
            style={{
              flex: 1,
              backgroundImage:
                'url("https://s3-alpha-sig.figma.com/img/5be2/2eef/0e1c7744840ef4837292e036287d9885?Expires=1733702400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QBSHkf-D7mrkauzbrkpmaJJk36bAHIeT9zVc4bLRnsk4KhEO2Iigw4oedO4vbCpcsYn58Md~cSOj8BpUB3tAC-JE65l-jLgRb3MbEw5XODGQk0XzHc1Mgv0ylyxIhEsZhl22UWgYcA4E4DQ1W0lLB6XNqStg3deLhX5U-L0qiET9S6xnn7IXwg88W3CCiZvcEB4tJeF3gCN36DbdKWKpj1XT6La4-SI~xa8reaDiFEWWNTlDQOgO~vnrqK5xy6Y0IMSx6iB7AyizCcaL7TeU4EbTAARpiD3h1KOjAcRnl-mQ7EQTZVya8fcu8xEm0B8t~kcMZaYrAua0WAB-AP~1vQ__")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div
            style={{
              flex: 1,
              padding: "45px",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#fff",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <NajotTalim />
              <h2 style={{ color: "#333" }}>Najot Talim</h2>
            </div>

            <div
              style={{
                marginTop: "140px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>
                <Title level={3} style={{ color: "#333" }}>
                  Tizimga kirish
                </Title>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ marginBottom: "1rem" }}>
                  <h3 style={{ marginBottom: "0.5rem" }}>Login</h3>
                  <Controller
                    name="login"
                    control={control}
                    rules={{ required: "Loginni kiriting" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="Loginni kiriting"
                        status={errors.login ? "error" : ""}
                      />
                    )}
                  />
                  {errors.login && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {errors.login.message}
                    </span>
                  )}
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <h3 style={{ marginBottom: "0.5rem" }}>Parol</h3>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Parolni kiriting" }}
                    render={({ field }) => (
                      <Input.Password
                        type="password"
                        {...field}
                        placeholder="Parolni kiriting"
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        status={errors.password ? "error" : ""}
                      />
                    )}
                  />
                  {errors.password && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <Button type="primary" htmlType="submit" block>
                  Kirish
                </Button>
              </form>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
