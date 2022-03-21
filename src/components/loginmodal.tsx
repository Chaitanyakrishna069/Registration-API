import "antd/dist/antd.css";
import { useState } from 'react';
import Loginpage from './loginpage';
import Resetpass from './resetpass';
import Registration from './registration';
import { Modal, Button } from 'antd';


const Loginmodal = () => {
    const [visiblelog, setVisiblelog] = useState(false);
    const [visiblerepass, setVisiblerepass] = useState(false);
    const [visiblereg, setVisiblereg] = useState(false);
    const [logforget, setLogforget] = useState(false);
    const [openreset, setopenreset] = useState(false);

    const closeLogin = (data) => {
        setLogforget(data)
    }
    const openresetpage = (data) => {
        setopenreset(data)
    }

    return (
        <div>
            <div style={{ display: 'inline' }}>
                {/* button for login modal */}
                <Button type="primary" onClick={() => setVisiblelog(true)} style={{ margin: "25px 1200px  auto", display: "block" }}>
                    Open login page
                </Button>

                {/* button for register modal */}
                <Button type="primary" onClick={() => setVisiblereg(true)} style={{ margin: "25px 1200px  auto", display: "block" }}>
                    Register
                </Button>
            </div>

            <Modal
                centered
                visible={(!logforget && visiblelog) && !openreset && visiblelog} // || !openreset && visiblelog
                onCancel={() => setVisiblelog(false)}
                footer={null}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <p>Welcome to vikasbandu</p>
                <Loginpage closeLogin={closeLogin} openresetpage={openresetpage} />
            </Modal>

            <Modal
                centered
                visible={openreset}
                onCancel={() => setopenreset(false)}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <p>Reset your password</p>
                <Resetpass openresetpage={openresetpage} />
            </Modal>

            <Modal
                centered
                visible={visiblereg}
                onCancel={() => setVisiblereg(false)}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                bodyStyle={{ overflowY: 'scroll', height: 600 }}
            >
                <p>Registration</p>
                <Registration />
            </Modal>
        </div>
    );
}

export default Loginmodal;