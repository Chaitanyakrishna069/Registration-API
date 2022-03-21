
import React, { useState } from 'react';
import { Modal, Button,Table} from 'antd';
import { ColumnsType } from 'antd/lib/table';
interface User {
  product: String;
  rate:number
}

const [visible, setVisible] = useState(false);
const columns: ColumnsType<User>  = [
  {
    title: 'Product',
    dataIndex:'product'
  },
  {
    title: 'Rate',
    dataIndex:'rate'
  }
];

const data = [{
  product: `vegies`,
  rate: 50,
},
{
  product: `Fruits`,
  rate: 100,
}];

const Modals = () => {
  return (
    <>
    <div style={{marginTop: "5px"}}>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open Modal of 1000px w
      </Button>
      </div>
      <Modal
        title="Modal 1000px width"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
      <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />
      </Modal>
    </>
  );
};

export default Modals;


