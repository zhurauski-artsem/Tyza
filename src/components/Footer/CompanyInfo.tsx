import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

import FooterInfo from "images/icons/footerInfo.svg";
import { colors } from "ui/colors";
import { device } from "ui/media";

const CompanyInfoWrapper = styled.div`
  border-top: 1px solid ${colors.silk};
  padding: 15px 0;

  @media ${device.mobile} {
    padding: 10px 0;
  }
`;

const InfoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  opacity: 50%;

  @media ${device.mobile} {
    font-size: 12px;
  }
`;

const CompanyInfo = () => {
  return (
    <CompanyInfoWrapper>
      <Container>
        <Row>
          <Col>
            <div className="d-flex align-items-center">
              <img className="mr-3" src={FooterInfo} alt="logo" />
              <InfoTextWrapper>
                <span>ПУП "Стария"</span>
                <span>
                  Юридический адрес: 223217, Минская область, Червенский район,
                  Смиловичский с/с, д. Старино
                </span>
              </InfoTextWrapper>
            </div>
          </Col>
        </Row>
      </Container>
    </CompanyInfoWrapper>
  );
};

export default CompanyInfo;
