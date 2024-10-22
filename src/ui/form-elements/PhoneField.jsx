import { Form } from "react-bootstrap";

const PhoneField = ({ label, span, ...props }) => {
  return (
    <div className="input-field w-100 phone-field">
      <label htmlFor={props.id}>
        <div className="d-flex justify-content-between align-items-center">
          {label}
        </div>
      </label>
      <div className="col-12 d-flex align-items-center gap-0">
        <Form.Control className="form-control" {...props} />
      </div>
      {span && <span className="input-span">{span}</span>}
    </div>
  );
};

export default PhoneField;
