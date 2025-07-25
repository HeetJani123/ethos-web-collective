-- Insert sample articles for the journal
INSERT INTO public.articles (title, content, excerpt, author_id, likes_count) VALUES
(
  'The Future of Digital Democracy: Lessons from Global Experiments',
  '<p>The intersection of technology and democratic governance has become one of the most fascinating areas of political research in the 21st century. As digital tools reshape how citizens engage with government, we find ourselves at a critical juncture in the evolution of democratic institutions.</p>

  <h3>Global Digital Democracy Initiatives</h3>
  <p>Our comprehensive study examined digital democratic innovations across five continents, from Estonia''s e-residency program to Taiwan''s vTaiwan platform. These experiments offer valuable insights into how technology can enhance civic participation while maintaining the integrity of democratic processes.</p>

  <h3>Key Findings</h3>
  <p>Three primary patterns emerged from our analysis:</p>
  <ul>
    <li><strong>Increased Participation:</strong> Digital platforms consistently showed higher engagement rates among younger demographics, with participation increasing by an average of 23% in studied cases.</li>
    <li><strong>Enhanced Transparency:</strong> Real-time access to government data and decision-making processes improved public trust in institutions by measurable margins.</li>
    <li><strong>Deliberative Quality:</strong> Well-designed digital platforms fostered more substantive policy discussions compared to traditional public forums.</li>
  </ul>

  <h3>Challenges and Considerations</h3>
  <p>However, our research also revealed significant challenges. Digital divides can exacerbate existing inequalities in political participation. Cybersecurity concerns and the potential for manipulation require robust safeguards. Most critically, the design of digital democratic tools must be guided by democratic principles, not technological possibilities alone.</p>

  <h3>Recommendations for Implementation</h3>
  <p>Based on our findings, we recommend a gradual, evidence-based approach to digital democracy implementation. This includes investing in digital literacy programs, establishing clear privacy and security standards, and maintaining multiple channels for civic participation to ensure inclusivity.</p>

  <p>The future of digital democracy lies not in replacing traditional democratic institutions, but in thoughtfully augmenting them with technology that serves democratic values and expands meaningful participation for all citizens.</p>',
  'Exploring innovations in civic participation and governance through digital democracy experiments worldwide.',
  (SELECT id FROM public.profiles LIMIT 1),
  15
),
(
  'Carbon Pricing Mechanisms in Developing Economies: A Comparative Analysis',
  '<p>As climate change accelerates, developing economies face a unique challenge: how to implement effective carbon pricing while maintaining economic growth and social equity. This comprehensive analysis examines carbon pricing mechanisms across twelve developing nations.</p>

  <h3>Market-Based vs. Regulatory Approaches</h3>
  <p>Our research reveals distinct patterns in how developing economies approach carbon pricing. Market-based mechanisms, such as carbon trading systems, show promise in countries with robust institutional frameworks. However, regulatory approaches often prove more effective in contexts with limited market infrastructure.</p>

  <h3>Social Impact Assessment</h3>
  <p>Carbon pricing policies inevitably affect different social groups differently. Our analysis shows that well-designed carbon pricing can actually reduce inequality when paired with targeted social programs. Revenue recycling mechanisms play a crucial role in ensuring equitable outcomes.</p>

  <h3>Implementation Challenges</h3>
  <p>Developing economies face unique implementation challenges including:</p>
  <ul>
    <li>Limited administrative capacity for monitoring and enforcement</li>
    <li>Informal economic sectors that are difficult to include in pricing schemes</li>
    <li>Political economy constraints and vested interests</li>
    <li>Need for international cooperation and financing</li>
  </ul>

  <h3>Success Stories</h3>
  <p>Despite challenges, several developing countries have successfully implemented carbon pricing. Mexico''s pilot ETS program, Colombia''s carbon tax, and South Africa''s proposed carbon tax offer valuable lessons for other developing economies.</p>

  <p>The path forward requires careful attention to local contexts, gradual implementation, and strong political commitment. International support remains crucial for successful carbon pricing in developing economies.</p>',
  'A comparative study of market mechanisms and social impact in carbon pricing across developing nations.',
  (SELECT id FROM public.profiles LIMIT 1),
  28
),
(
  'Artificial Intelligence Ethics in Healthcare: Balancing Innovation and Patient Rights',
  '<p>The rapid integration of artificial intelligence in healthcare presents unprecedented opportunities to improve patient outcomes while raising fundamental questions about ethics, privacy, and the nature of medical care itself.</p>

  <h3>Current AI Applications in Healthcare</h3>
  <p>AI technologies are already transforming healthcare delivery through diagnostic imaging, drug discovery, personalized treatment plans, and predictive analytics. These applications have shown remarkable success in improving diagnostic accuracy and treatment efficiency.</p>

  <h3>Ethical Frameworks for Healthcare AI</h3>
  <p>Developing appropriate ethical frameworks requires balancing multiple considerations:</p>
  <ul>
    <li><strong>Beneficence and Non-maleficence:</strong> Ensuring AI systems improve patient outcomes without causing harm</li>
    <li><strong>Autonomy:</strong> Preserving patient choice and informed consent in AI-assisted care</li>
    <li><strong>Justice:</strong> Preventing AI from exacerbating health disparities</li>
    <li><strong>Transparency:</strong> Making AI decision-making processes understandable to patients and providers</li>
  </ul>

  <h3>Privacy and Data Protection</h3>
  <p>Healthcare AI systems require vast amounts of personal health data, raising critical privacy concerns. Our analysis of current privacy frameworks reveals significant gaps in protection for AI-generated insights and longitudinal health profiles.</p>

  <h3>Regulatory Approaches</h3>
  <p>Different countries are taking varied approaches to regulating healthcare AI. The EU''s Medical Device Regulation provides a comprehensive framework, while the US FDA is developing risk-based approaches. Developing countries face unique challenges in building regulatory capacity.</p>

  <h3>Recommendations for Ethical AI Implementation</h3>
  <p>Successful integration of AI in healthcare requires multi-stakeholder governance, continuous monitoring of outcomes, and robust accountability mechanisms. Healthcare institutions must invest in AI literacy for providers and develop clear policies for AI use.</p>',
  'Examining the ethical implications of AI integration in healthcare systems worldwide.',
  (SELECT id FROM public.profiles LIMIT 1),
  42
);

-- Create a sample member profile for article posting
INSERT INTO public.profiles (user_id, display_name, is_member) 
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Dr. Sarah Chen', true)
ON CONFLICT (user_id) DO UPDATE SET 
  display_name = EXCLUDED.display_name,
  is_member = EXCLUDED.is_member;