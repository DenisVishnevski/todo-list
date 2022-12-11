
function ContactButton(props) {
    return (
       <a href={props.link} title={props.title} className="contact_button" target="_blank">
            <img src={props.icon} alt={props.title} />
       </a>
    );
}

export default ContactButton;