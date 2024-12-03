import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import Wrapper from './notification.style';
import {handleTextLong} from '../../helpers/utility';
import {Link} from 'react-router-dom';
const Notification = (props) => {
  const [NotificationInfo, setNotificationInfo] = useState({});
  const [viewNotification, setViewNotification] = useState(false);
  useEffect(() => {}, []);
  return (
    <Wrapper>
      {viewNotification ? (
        <div className="menu-notification">
          <div className="menu-header">
            <p className="menu-title">Nhắc việc</p>
            <p
              className="menu-close"
              onClick={(e) => setViewNotification(false)}
            >
              &times;
            </p>
          </div>
          <div className="menu-content">
            <div className="menu-item">
              <div className="menu-item__link">
                <Link to={''}>Đơn thư cần phân xử lý</Link>
              </div>
              <div className="menu-item__content"></div>
            </div>
            <div className="menu-item">
              <div className="menu-item__link">
                <Link to={''}>Đơn thư cần duyệt xử lý</Link>
              </div>
              <div className="menu-item__content"></div>
            </div>
            <div className="menu-item">
              <div className="menu-item__link">
                <Link to={''}>Đơn thư cần phân giải quyết</Link>
              </div>
              <div className="menu-item__content"></div>
            </div>
            <div className="menu-item">
              <div className="menu-item__link">
                <Link to={''}>Đơn thư cần duyệt giải quyết</Link>
              </div>
              <div className="menu-item__content"></div>
            </div>
            <div className="menu-item">
              <div className="menu-item__link">
                <Link to={''}>Văn bản đôn đốc, công văn chỉ đạo</Link>
              </div>
              <div className="menu-item__content"></div>
            </div>
            <div className="menu-item">
              <div className="menu-item__link">
                <Link to={''}>Đơn thư có phản hồi</Link>
              </div>
              <div className="menu-item__content"></div>
            </div>
          </div>
        </div>
      ) : null}
      {/* <div
        className="notification-wrapper"
        onClick={(e) => setViewNotification(!viewNotification)}
      >
        <div className="notification-circle">
          <i class="fa fa-bell notification-icon" ></i>
          <p className='notification-content'>{handleTextLong(123456, 3, '..')}</p>
        </div>
      </div> */}
    </Wrapper>
  );
};

export default Notification;
