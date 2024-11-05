// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import MembershipCard, {type MembershipPlan} from './membership_card';
import MembershipHeader from './membership_header';
import buildingIcon from "./Group.png"
const studentPlan: MembershipPlan = {
    title: '.edu',
    info: 'Teachers, Students, and Administrators in K12 and College Programs',
    pricing: '$10.99',
    pricingSubtext: 'USD per seat/month',
    isBilledAnnually: true,
    isCurrentPlan: true,
    topFeatures: `Learn more about our .edu program at`,
};

const gitoPlan: MembershipPlan = {
    title: 'Gito',
    info: 'Your own AI Sidekick. Includes unlimited workspaces & apps.',
    pricing: '$14.99',
    pricingSubtext: 'USD per seat/month',
    isBilledAnnually: true,
    topFeatures: "fef",
};

const gitoPlusPlan: MembershipPlan = {
    title: 'Gito Link',
    info: 'Got a friend? Get a discount for multiple accounts.',
    pricing: '$20',
    pricingSubtext: 'USD per seat/month',
    isBilledAnnually: true,
    topFeatures: "Learn about our Gito Link program at",
};

const gitoLinkPlan: MembershipPlan = {
    title: 'GitoSuite',
    info: 'Administration, security, and compliance that is fully customizable for any team.',
    pricing: '$7.99',
    pricingSubtext: 'USD per seat/month',
    isBilledAnnually: true,
    topFeatures: "fef",
};



const Membership = () => {
    return (
        <div id='membership'>
            <MembershipHeader/>
            <div className='content'>
                <div className='membership-plans'>
                    <div className='hint'>
                        <div>
                            {'Looking for custom solutions?'} <a href='#'>{'Contact Us'}</a>
                        </div>
                    </div>
                    <MembershipCard
                        membershipPlan={studentPlan}
                        color='#3DB887'
                    >
                        <MembershipCard.Title/>
                        <MembershipCard.Info/>
                        <MembershipCard.Pricing/>
                        <MembershipCard.CtaButton disabled={true}>
                            {'Downgrade'}
                        </MembershipCard.CtaButton>
                        <MembershipCard.TopFeatures/>
                        <div className='id-text'>*ID and Proof of .edu email address is required at sign-up.</div>
                     
                    </MembershipCard>
                    <MembershipCard
                        membershipPlan={gitoPlan}
                        color='#02B9B5'
                    >
                        <MembershipCard.Title/>
                        <MembershipCard.Info/>
                        <MembershipCard.Pricing/>
                        <MembershipCard.CtaButton>
                            {'Upgrade'}
                        </MembershipCard.CtaButton>
             
                     
                    </MembershipCard>
                    <MembershipCard
                        membershipPlan={gitoPlusPlan}
                        color='#7C99D2'
                    >
                        <MembershipCard.Title/>
                        <MembershipCard.Info/>
                        <MembershipCard.Pricing/>
                        <MembershipCard.CtaButton>
                            {'Upgrade'}
                        </MembershipCard.CtaButton>
                        <MembershipCard.TopFeatures/>
                     
                    </MembershipCard>
                    <MembershipCard
                        membershipPlan={gitoLinkPlan}
                        color='#FFBC1F'
                    >
                        <MembershipCard.Title/>
                        <MembershipCard.Info/>
                        <div className='bulding-container'>
                      <img className='buildingIcon' src={buildingIcon} alt="buidling" /></div>
                        <MembershipCard.CtaButton>
                            {'Contact Sales'}
                        </MembershipCard.CtaButton>
    
                     
                    </MembershipCard>
                 
                </div>
            </div>
        </div>
    );
};

export default Membership;
