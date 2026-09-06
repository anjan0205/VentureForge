import os
import sys
from dotenv import load_dotenv

# Ensure credentials loaded
load_dotenv()

from lyzr import Studio

def build_venture_forge_agents():
    print("Connecting to Lyzr Studio platform with account:", os.getenv("LYZR_USER_ID"))
    studio = Studio()

    # Define the 6 core pipeline agents + 4 Kill Mode agents for VentureForge
    agent_specs = [
        {
            "name": "VentureForge_Idea_Analyst",
            "role": "Hypothesis Decomposition Specialist",
            "goal": "Clarify and decompose raw startup ideas into structured target customer segments, pain statements, value props, and core assumptions.",
            "instructions": "Deconstruct raw business hypotheses into high-conviction value propositions and pinpoint fatal baseline assumptions.",
            "provider": "openai/gpt-4o-mini"
        },
        {
            "name": "VentureForge_Market_Researcher",
            "role": "Competitive Reconnaissance Specialist",
            "goal": "Perform live web reconnaissance to map incumbent competitors, market moats, white spaces, and evidence claims.",
            "instructions": "Map live competitors, assess market defensibility, and categorize all claims strictly into FACT, INFERENCE, or ASSUMPTION.",
            "provider": "openai/gpt-4o-mini"
        },
        {
            "name": "VentureForge_Customer_Validator",
            "role": "Friction & Willingness-to-Pay Validator",
            "goal": "Identify acute customer pain mechanics, switching barriers, pricing friction, and actionable validation experiments.",
            "instructions": "Evaluate target customer workflow inertia, willingness to pay, and design high-impact verification experiments.",
            "provider": "openai/gpt-4o-mini"
        },
        {
            "name": "VentureForge_Business_MVP",
            "role": "Unit Economics & Tech Architect",
            "goal": "Engineer monetization models, pricing tier boundaries, MVP must-have features, and tech stack architecture.",
            "instructions": "Define robust business monetization strategy, tier pricing, and minimal viable product feature boundaries.",
            "provider": "openai/gpt-4o-mini"
        },
        {
            "name": "VentureForge_GTM_Strategist",
            "role": "Acquisition Architecture Specialist",
            "goal": "Build positioning narratives, elevator thesis, first 100 customer acquisition playbooks, and launch roadmaps.",
            "instructions": "Engineer high-conversion positioning, distribution channels, and 4-week execution roadmaps for early customer traction.",
            "provider": "openai/gpt-4o-mini"
        },
        {
            "name": "VentureForge_Synthesizer",
            "role": "Viability Scoring Synthesizer",
            "goal": "Synthesize multi-agent outputs into an 8-dimensional weighted viability matrix and composite score.",
            "instructions": "Consolidate analytical outputs into an 8-dimensional weighted viability score (0-100) with clear conviction reasoning.",
            "provider": "openai/gpt-4o-mini"
        },
        # Adversarial Kill Protocol Agents
        {
            "name": "VentureForge_VC_Critic",
            "role": "Hostile Tier-1 VC Partner",
            "goal": "Attack venture scalability, TAM ceiling, fundability, and capital efficiency.",
            "instructions": "Adversarially critique venture strategy from a skeptical VC partner perspective, highlighting fatal scaling flaws.",
            "provider": "openai/gpt-4o-mini"
        },
        {
            "name": "VentureForge_Customer_Critic",
            "role": "Skeptical Enterprise Buyer",
            "goal": "Attack switching friction, integration hurdles, and budget justification.",
            "instructions": "Adversarially critique venture product value from an enterprise buyer perspective, exposing adoption barriers.",
            "provider": "openai/gpt-4o-mini"
        },
        {
            "name": "VentureForge_Competitor_Critic",
            "role": "Dominant Incumbent Strategy Chief",
            "goal": "Attack feature replication vulnerability and incumbent moat retaliation.",
            "instructions": "Adversarially critique venture defensibility from an incumbent leader perspective, detailing how easily features are copied.",
            "provider": "openai/gpt-4o-mini"
        },
        {
            "name": "VentureForge_Arbiter_Judge",
            "role": "Lead Partner Rebuild Arbiter",
            "goal": "Arbitrate adversarial criticisms and construct a hardened Version 2 Architecture.",
            "instructions": "Filter out non-actionable critic noise, prioritize structural fixes, and engineer a hardened Version 2 Strategy.",
            "provider": "openai/gpt-4o-mini"
        }
    ]

    # Fetch existing agents
    existing_agents = studio.list_agents()
    existing_by_name = {a.name: a.id for a in existing_agents}
    print(f"Current agents on account ({len(existing_agents)}): {[a.name for a in existing_agents]}")

    created_agents = []
    for spec in agent_specs:
        if spec["name"] in existing_by_name:
            print(f"[OK] Agent '{spec['name']}' already exists on account (ID: {existing_by_name[spec['name']]}).")
            created_agents.append({"name": spec["name"], "id": existing_by_name[spec["name"]]})
        else:
            print(f"Creating agent '{spec['name']}' on Lyzr Studio...")
            agent = studio.create_agent(
                name=spec["name"],
                role=spec["role"],
                goal=spec["goal"],
                instructions=spec["instructions"],
                provider=spec["provider"],
                temperature=0.7
            )
            print(f"  -> Created successfully! Agent ID: {agent.id}")
            created_agents.append({"name": spec["name"], "id": agent.id})

    print("\n--- VentureForge Agents Successfully Registered on Lyzr Studio ---")
    for a in created_agents:
        print(f"• {a['name']}: {a['id']}")

if __name__ == "__main__":
    build_venture_forge_agents()
