import './profileTable.css';

const ProfileTable = ({ userData }) => {
        return (
            <div className="profile-table">
                <div className="table-container">
                    <div className="table-row">
                        <div className="table-label">Email</div>
                        <div className="table-value">{ userData.email }</div>
                    </div>
                    <div className="table-row">
                        <div className="table-label">Password</div>
                        <div className="table-value">********</div>
                    </div>
                    <div className="table-row">
                        <div className="table-label">Role</div>
                        <div className="table-value">{ userData.role }</div>
                    </div>
                </div>
            </div>
        );
    }
;

export default ProfileTable;

