import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import MainContainer from '../components/MainContainer';

import styles from '../styles/App.module.scss';

import { translates } from '../locales/locales';
import Aside from '../components/Aside';
import ProfileComponent from '../components/Profile';

const Profile = () => {
    const router = useRouter();
    const stateUser = useSelector((state) => state.royalfutReducer.user);

    let [ava, setAva] = useState('');

    const changeAva = (e) => {
        let fr = new FileReader();

        console.log(e.currentTarget);
        let oneFile = e.currentTarget.files.item(0);

        if (!oneFile) {
            return;
        }

        if (
            e.currentTarget.files.size > Number($(e.currentTarget).data('size'))
        ) {
            e.currentTarget.files = null;
            // eslint-disable-next-line no-alert
            alert('The file is too large.');
        } else {
            fr.onload = (event) => {
                setAva(event.target.result);
                console.log(event.target.result);
            };

            fr.readAsDataURL(oneFile);
        }

        // eslint-disable-next-line consistent-return
        return true;
    };

    return (
        <MainContainer>
            <div className={`${styles.app_main}`}>
                <div className={`${styles.app_profile_wrapper}`}>
                    <picture className={`${styles.app_profile_ava}`}>
                        <div className={`${styles.app_profile_char}`}>v</div>
                        <img src={ava} className={!ava && 'hide'} />
                        <label className={`${styles.app_profile_btn_ava}`}>
                            {/* <input
                                //onClick={changeAva}
                                className={`${styles.app_profile_fileinput}`}
                                type={'image'}
                                accept=".png, .jpg, .jpeg"
                                data-size="307200000"
                            /> */}
                            <input
                                className={`${styles.app_profile_fileinput}`}
                                id="profile-file"
                                type="file"
                                name="input-video"
                                accept=".png, .jpg, .jpeg"
                                data-size="307200000"
                            ></input>
                        </label>
                    </picture>
                    <h1 className={`${styles.app_profile_h1}`}>
                        {stateUser.email}
                    </h1>
                </div>
                <ProfileComponent />
            </div>
        </MainContainer>
    );
};

export default Profile;
