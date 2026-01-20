import { IRowContextExpansionProps } from "@/types"
import { UserType } from "./validation/user.schema"
import { Button } from "@mantine/core";


export  const RowExceptionContent = (params: IRowContextExpansionProps<UserType>)=>{
        const { record, index, collapse } = params;
        return (
            <div style={{ padding: '10px 20px', backgroundColor: '#f9f9f9' }}>
                <h4>تفاصيل المستخدم: {record.name}</h4>
                <p><strong>البريد الإلكتروني:</strong> {record.email}</p>
                <p><strong>الهاتف:</strong> {record.phone}</p>
                <p><strong>الدور:</strong> {record.role}</p>
                <p><strong>الحالة:</strong> {record.status}</p>
                <Button size="xs" onClick={collapse}>إغلاق التفاصيل</Button>
            </div>
        )
    }