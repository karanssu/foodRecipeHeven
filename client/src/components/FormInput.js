import "./FormInput.css";

const FormInput = ({
	id,
	type,
	icon,
	placeholder,
	ref,
	handleChange,
	errorMessage,
}) => {
	return (
		<>
			<div className="input-group">
				<div className="input-group-prepend">
					<span
						className="input-group-text form-input-icon-container"
						id={"basic-addon" + id}
					>
						<div
							style={{
								width: "25px",
								height: "25px",
							}}
							className="d-flex align-items-center justify-content-center"
						>
							<img
								src={icon}
								alt={placeholder + " Icon"}
								width="20"
								height="20"
							/>
						</div>
					</span>
				</div>
				<input
					type={type}
					ref={ref}
					onChange={handleChange}
					className="form-control form-input"
					placeholder={placeholder}
					aria-label={placeholder}
					aria-describedby={"basic-addon" + id}
				/>
			</div>
			<div className="form-error text-danger mt-1">{errorMessage}</div>
		</>
	);
};

export default FormInput;
