import React, {useContext} from "react"
import {SettingsContext} from "../../context/SettingsProvider"
import { Card } from 'antd';
import BackgroundInput from "./BackgroundInput"


function ChangeTheme() {
    const { onThemeChange, themeRef } = useContext(SettingsContext)

    return(
        <div className="change-theme-container">
            <h1 className="change-theme-title">Theme Changer</h1>
            <p data-theme-background={themeRef.current} className="change-theme-description background color">Select your theme.</p>
            <div>
                <form className="cards-container" onChange={onThemeChange}>
                    <Card title="Light Mode" className="change-theme-card">
                        <div>
                            <img src="https://images.unsplash.com/photo-1525490829609-d166ddb58678?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzg4fHx3aGl0ZSUyMGNsb3Vkc3xlbnwwfDB8MHx8&auto=format&fit=crop&w=500&q=60" style={{width: "210px"}} />
                        </div>
                        <BackgroundInput 
                            value="light"
                        />
                    </Card>
                    <Card title="Dim Mode" className="change-theme-card">
                        <div>
                            <img src="https://images.unsplash.com/photo-1576954115039-9aebebb79ad2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGlnaHQlMjBjbG91ZHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="dim-mode" style={{width: "225px"}} />
                        </div>
                        <BackgroundInput
                            value="dim"
                        />
                    </Card>                
                    <Card title="Dark Mode" className="change-theme-card">
                        <div>
                            <img src="https://images.unsplash.com/photo-1559807715-d9dd67798420?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGRhcmslMjBjbG91ZHN8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="dark-mode" style={{width: "230px"}}/>
                        </div>
                        <BackgroundInput
                            value="dark"
                        />
                    </Card>
                </form>
            </div>
        </div>
    )
}

export default ChangeTheme