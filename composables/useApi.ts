import Common from './api/module/common'
import Role from './api/module/role'
import User from './api/module/user'
import Content from './api/module/content'
import Company from './api/module/company'
import Complaint from './api/module/complaint'
import GateWay from './api/module/gateWay'
export default function() {
    return {
        Common,
        Role,
        User,
        Content,
        Company,
        Complaint,
        GateWay
    }
}