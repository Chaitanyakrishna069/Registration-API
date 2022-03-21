import { Form, Input, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import { ResetPassword } from '../slice/loginCheck';
import "antd/dist/antd.css";
import validator from 'validator'

const Resetpass = (props) => {
  const [errorMessage, setErrorMessage] = useState(false)
  const [check, setCheck] = useState(0);
  const [form] = Form.useForm();
  useEffect(() => {
    showmessage();
  }, [check])

  const showmessage = async () => {
    if (check == 1) {
      success()
    }
    if (check == 2) {
      error()
    }
  }
  const onFinish = async (values: any) => {
    let { newpassword } = values;
    // console.log(new);
    // newpassword = 'LPcsn@069'
    const vals = await ResetPassword(newpassword);
    // let vals = 1;
    console.log(vals);
    if (vals == 1) {
      setCheck(1)
      form.resetFields()
      props.openresetpage(false)
    }
    else {
      setCheck(2)
    }
    setCheck(0)
  };

  const success = () => {
    message.success('Great Password know login to the page');
  };

  const error = () => {
    message.error('Something went wrong');
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const validate = (value: string) => {

    if (validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1
    })) {
      setErrorMessage(false)
    } else {
      setErrorMessage(true)
    }
  }
  return (
    <Form
      name="basic"
      labelCol={{ span: 0 }}
      wrapperCol={{ span: 24 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
      autoComplete="off"
    >
      <Form.Item
        label="newpassword"
        name="newpassword"
        {...(errorMessage && {
          validateStatus: "error",
          help: "Not a strong password",
        })}
        rules={[{ required: true, message: 'Please input your password' }]}
        hasFeedback
      >
        <Input onChange={(e) => validate(e.target.value)} placeholder={"At least 8 characters along with nums and symbols"} />
      </Form.Item>

      <Form.Item
        label="confirm"
        name="confirm"
        rules={[{ required: true, message: 'Please input your password again' }, ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('newpassword') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The two passwords that you entered do not match!'));
          },
        })]}
        dependencies={['password']}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
};


export default Resetpass;

