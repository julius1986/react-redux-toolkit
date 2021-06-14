import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from "react-transition-group";
import {
  deleteUserById,
  fetchUsers,
} from "../../reduxslice/usersSlice/usersSlice";
import "./UsersList.scss";

export default function UsersList() {
  const dispatch = useDispatch();
  const { isLoading, users } = useSelector((state) => state.usersSlice);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 10);
    dispatch(fetchUsers());
  }, [dispatch]);
  const clickHandler = (id) => {
    dispatch(deleteUserById(id));
  };

  return (
    <CSSTransition in={show} timeout={500} classNames="item">
      <div>
        {show ? (
          <SwitchTransition>
            <CSSTransition
              key={isLoading ? 1 : 2}
              timeout={500}
              classNames="item"
            >
              <div>
                {isLoading ? (
                  "LOADING"
                ) : (
                  <TransitionGroup>
                    {users.map((user) => (
                      <CSSTransition
                        key={user.id}
                        timeout={500}
                        classNames="item"
                      >
                        <div
                          onClick={clickHandler.bind(this, user.id)}
                          key={user.id}
                        >
                          {user.name}
                        </div>
                      </CSSTransition>
                    ))}
                  </TransitionGroup>
                )}
              </div>
            </CSSTransition>
          </SwitchTransition>
        ) : null}
      </div>
    </CSSTransition>
  );
}
