import React from "react";
import './App.css';

const Form = () => {
    //Voting function


    return(
        <div>
        <div className="candidate">
            <form>
                <input type="checkbox"/>
            </form>
            <span className="candidate-name">Cherry Willshere</span>
            <p className="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>

        </div>
            <div className="candidate">
                <form>
                    <input type="checkbox"/>
                </form>
                <span className="candidate-name">John Summer</span>
                <p className="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
            </div>
            <div className="candidate">
                <form>
                    <input type="checkbox"/>
                </form>
                <span className="candidate-name">Peter Glillz</span>
                <p className="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
            </div>
        </div>

    );
}
export default Form;