import { useState } from "react";
import ImgCrop from 'antd-img-crop';
import { uploadFileToS3 } from "../slice/loginCheck";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
let profilePic : RcFile|string ="";
let adharPic: RcFile | string = "";
let panPic: RcFile | string = "";
let exceldata: RcFile | string = "";

export default function Registration() {
  const { Option } = Select;

  const [stage, setStage] = useState(1)
  const formItemLayout = {
    labelCol: {
      sm: { span: 6, offset: 2 },
    },
    wrapperCol: {
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      sm: {
        span: 20,
        offset: 2,
      },
    },
  };

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    delete values["prefix"];
    if(profilePic){
      const profs3 = await uploadFileToS3(profilePic)
      console.log(profs3,'in')
      values["profiles3"] = "dummyprofs3";
    }
    if(adharPic){
      const adhars3 = await uploadFileToS3(adharPic)
      values["adharS3"] = "dummyadhars3";
    }
    if(panPic){
      const pans3 = await uploadFileToS3(panPic)
      values["panS3"] = "dummypans3";
    }
    if(exceldata){
      const pans3 = await uploadFileToS3(exceldata)
      values["excelS3"] = "dummyexcel3";
    }
    // console.log(profilePic,'profile data')
    // console.log(adharPic,'adhar data')
    // console.log( panPic,'pancard data')
    console.log( values)
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

  //profile image related states
  const initFileList: Array<RcFile> = []
  const [fileList, setFileList] = useState(initFileList);
  // let [profilePic, setProfilePic]= useState(initFileData);

  const getFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: { url: any; originFileObj: Blob; }) => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src)!
    imgWindow.document.write(image.outerHTML);
  };
  const [mobile, setmobile] = useState("");
  const [isError, setIsError] = useState(true);


  return (
    <>
      <div style={{ marginBottom: 0 }} >
        <div
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Button type="primary" block onClick={() => { setStage(1) }} >
            Register with details
          </Button>
        </div>
        <div
          style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '0 4px' }}
        >
          <Button type="primary" block onClick={() => { setStage(2) }} >
            Register with excel file
          </Button>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        {stage == 1 &&
         <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            prefix: "91",
          }}
          scrollToFirstError
          labelAlign="left">
          <Form.Item wrapperCol={{ offset: 10, span: 14 }}
          >
            <ImgCrop>
              <Upload
                beforeUpload={(file) => {
                  profilePic = file;
                  return false;
                } }
                listType="picture-card"
                onChange={onChange}
              >
                {fileList.length < 1 && '+ Upload'}
              </Upload>
            </ImgCrop>
          </Form.Item>

          <Form.Item
            label="name"
            name="name"
             rules={[{ required: true, message: "Please input your Name!" }]}
           >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender!" }]}
            > 
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
            > 
            <Input allowClear />
          </Form.Item>

          <Form.Item
            name="years_of_experience"
            label="experience"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99,
                required: true,
                message: "Enter experience",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="phone_no"
            label="Phone Number"
            {...(!isError && {
              validateStatus: "error",
              help: "Should be 10 digit number",
            })}
            rules={[{ required: true, message: "Please input phone num!" }]}
           > 
            <Input
              addonBefore={prefixSelector}
              style={{ width: "100%" }}
              onChange={(e) => {
                setmobile(e.target.value);
                if (e.target.value.length === 10) {
                  setIsError(true);
                } else {
                  setIsError(false);
                }
              }}
              id="phone_no"
            />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please Enter your Address!" }]}
            > 
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item
            label="Thaluka"
            name="thaluka"
            rules={[{ required: true, message: "Please input your Taluka!" }]}
            > 
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Distict"
            name="distict"
            rules={[{ required: true, message: "Please input your Distict!" }]}
           >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: "Please input your State!" }]}
            >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="pin_code"
            name="pin_code"
            rules={[{ required: true, message: "Please input your pin code!" }]}
            >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="pancard"
            // valuePropName="fileList"
            // getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please upload pancard photo" }]}
            extra="upload pancard">
            <Upload name="pancard"  
            beforeUpload={(file) => {
              panPic = file;
              return false;
            } }
            listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="adharcard"
            // valuePropName="fileList"
            // getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please upload adharcard photo" }]}
            extra="upload adharcard">
            <Upload name="adhar"  
            beforeUpload={(file) => {
              adharPic = file;
              return false;
            } }
            listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>}
        {stage == 2 &&
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            labelAlign="left"
          >
            <Form.Item
              label="excel"
              // valuePropName="fileList"
              // getValueFromEvent={normFile}
              rules={[{ required: true, message: "Please upload correct file" }]}
              extra="upload excel file">
              <Upload name="excel" 
              beforeUpload={(file) => {
                exceldata = file;
                return false;
              } }
              listType="picture" accept=".xlsx">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
          </Form>
        }
      </div>
    </>
  );
}
