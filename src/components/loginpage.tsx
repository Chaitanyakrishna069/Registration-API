import { Form, Input, Button, Modal } from 'antd';
import { message, Space } from 'antd';
import "antd/dist/antd.css";
import { LoginCheck } from '../slice/loginCheck';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Forgetpass from './forgetpass';

const Loginpage = (props) => {
  const [visible, setVisible] = useState(false);
  const [val, setval] = useState(0);
  const [form] = Form.useForm();
  const [user, setuser] = useState("");
  useEffect(() => {
    showmessage();
  }, [val])
  // message alearting funcitons


  const showmessage = async () => {
    if (val == 1) {
      success()
    }
    if (val == 2) {
      error()
    } if (val == 3) {
      warning()
    }
  }
  const success = () => {
    message.success('Welcome to vikas bindu');
  };

  const error = () => {
    message.error('wrong credentials');
  };

  const warning = () => {
    message.warning('Hai new user reset your password know');
  };

  const onFinish = async (values: any) => {
    const vals = await LoginCheck(values);
    setuser(vals.usename)
    if (vals == 1) {
      setval(1)
      form.resetFields();
    }
    if (vals == 2) {
      setval(2)
      form.resetFields();
      form.setFieldsValue({ username: values.username })
    }
    if (vals == 3) {
      setval(3)
      props.openresetpage(true)

    }
    setval(0)
  };

  const forgetOpen = () => {
    setVisible(true)
    props.closeLogin(true)
  }

  const forgetClose = () => {
    setVisible(false)
    props.closeLogin(false)
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <><Form
      name="normal_login"
      className="login-form"
      form={form}
      onFinish={onFinish}
      // initialValues={{ remember: true }}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password" />
      </Form.Item>
      <Form.Item>
        {/* <Link className="login-form-forgot" to="./profileimg.txs" >Forgot password</Link>  */}
        <a className="login-form-forgot" onClick={() => { forgetOpen() }}>Forget password</a>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" className="login-form-button" block>
            Log in
          </Button>
        </Space>
      </Form.Item>
    </Form>

      <Modal
        centered
        visible={visible}
        onCancel={() => { forgetClose() }}
        width={500}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
      >
        <p>Set New password</p>
        <Forgetpass forgetClose={forgetClose} />
      </Modal></>

  );
};


export default Loginpage;

