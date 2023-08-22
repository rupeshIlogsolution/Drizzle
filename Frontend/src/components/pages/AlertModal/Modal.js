import { useEffect, useState } from "react";
import warningimg from '../../../image/warning2.png'
import crossImg from '../../../image/cross.gif'
import successImg from '../../../image/successtick.gif'
const Modal = (props) => {
    const [showmodal, setShowmodal] = useState(false);

    useEffect(() => {
        setShowmodal(props.show);
    }, [props]);

    const showtoggle = (e) => {
        setShowmodal(false)
        props.url !== 'self' ? window.location.href = props.url : setShowmodal(false);
        // props.url==='self'? window.location.reload(): props.url==='on'?'':window.location.href=props.url;
    };

    return (
        <>
            <div
                className={"modal fade" + (showmodal ? "show d-block" : "d-none")}
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="false"
                style={{ background: "rgba(0,0,0,0.6)",zIndex:'10000' }}
                // style={{ background: "rgba(255,255,255,0.6)" }}
            >
                <div className="modal-dialog modal-dialog-centered" style={{ width: '360px' }}>
                    <div className={`modal-content`} style={{ boxShadow: '3px 3px 8px #333, inset -1px -1px 5px gray', border: '1px solid rgb(13,13,252,0.4)', height: '310px', borderRadius: '15px' }}>
                        <div className={`modal-body d-flex flex-column justify-content-between`}>
                            <img src={props.theme === 'warning' ? warningimg : props.theme === 'danger' ? crossImg : successImg} width="140" height="130" alt="Alert Icons" style={{ margin: 'auto' }} />
                            <div className="d-flex justify-content-between">
                                <h1 className="fs-5 pb-0 mb-0 text-center" id="staticBackdropLabel">{props.text}<br />
                                </h1>
                                {/* <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={showtoggle}
                                ></button> */}
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={showtoggle}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
