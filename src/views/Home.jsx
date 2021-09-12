import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as userActions from '../redux/userSlice'
import Modal from 'react-modal';

import Table from '../components/Table'

const modalStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
    },
  };

export default function Home() {
    const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

    const [userName, setUserName] = useState('')
    const [userAddress, setUserAddress] = useState('')

    const users = useSelector(state => state.users.list)
    const dispatch = useDispatch()

    const openModal = () => setIsCreateUserModalOpen(true)
    const closeModal = () => setIsCreateUserModalOpen(false)

    const onConfirm = () => {
        closeModal()
        dispatch(userActions.createUser({
            name: userName,
            address: userAddress
        }))
    }

    return (
        <div className="main">
            <button onClick={openModal} className="btn btn--primary">add user</button>
            <Table data={users} />
            <br />
            <Table data={users} />

            <Modal
                isOpen={isCreateUserModalOpen}
                onRequestClose={closeModal}
                style={modalStyle}
                contentLabel="Example Modal"
            >
                <h3 className="mrgt0">Add User</h3>
                <form>
                    <div>
                        <label for="name">Name</label>
                        <input
                            className="field"
                            id="name"
                            name="name"
                            type="text"
                            value={userName}
                            onChange={evt => setUserName(evt.target.value)}
                        />
                    </div>

                    <div>
                        <label for="address">Address</label>
                        <input
                            className="field" 
                            id="address" 
                            name="address" 
                            type="text" 
                            value={userAddress} 
                            onChange={evt => setUserAddress(evt.target.value)}
                        />
                    </div>
                </form>

                <div className="mrgt">
                    <ul className="list-inline mrgt push-right">
                        <li><button className="btn btn--neutral" onClick={closeModal}>Cancel</button></li>
                        <li><button className="btn btn--primary" onClick={onConfirm}>Confirm</button></li>
                    </ul>
                </div>
            </Modal>
        </div>
    )
}
