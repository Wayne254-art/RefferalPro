import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem } from 'reactstrap';
import './mail-page.css';

const sampleMails = [
    {
        id: 1,
        subject: 'Welcome to Elite Motors!',
        sender: 'support@elitemotors.com',
        date: '2024-07-01',
        body: 'Thank you for joining Elite Motors. We are excited to have you on board!'
    },
    {
        id: 2,
        subject: 'Your Vehicle Listing is Approved',
        sender: 'no-reply@elitemotors.com',
        date: '2024-07-02',
        body: 'Congratulations! Your vehicle listing has been approved and is now live on our platform.'
    },
    {
        id: 3,
        subject: 'Monthly Newsletter - July 2024',
        sender: 'newsletter@elitemotors.com',
        date: '2024-07-03',
        body: 'Welcome to the July edition of the Elite Motors newsletter. Here are the latest updates and offers...'
    }
];

const MailPage = () => {
    const [selectedMail, setSelectedMail] = useState(null);

    const handleMailClick = (mail) => {
        setSelectedMail(mail);
    };

    return (
        <Container>
            <Row>
                <Col md="4">
                    <ListGroup>
                        {sampleMails.map(mail => (
                            <ListGroupItem 
                                key={mail.id} 
                                onClick={() => handleMailClick(mail)} 
                                className={`mail-item ${selectedMail && selectedMail.id === mail.id ? 'active' : ''}`}
                            >
                                <div className="mail-sender">{mail.sender}</div>
                                <div className="mail-subject">{mail.subject}</div>
                                <div className="mail-date">{mail.date}</div>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </Col>
                <Col md="8">
                    {selectedMail ? (
                        <Card className="mail-detail slide-down">
                            <CardBody>
                                <CardTitle tag="h5">{selectedMail.subject}</CardTitle>
                                <div className="mail-meta">
                                    <span className="mail-sender">From: {selectedMail.sender}</span>
                                    <span className="mail-date">Date: {selectedMail.date}</span>
                                </div>
                                <CardText>{selectedMail.body}</CardText>
                            </CardBody>
                        </Card>
                    ) : (
                        <div className="no-mail-selected">Select a mail to view its content.</div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default MailPage;
