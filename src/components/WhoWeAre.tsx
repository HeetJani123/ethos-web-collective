const WhoWeAre = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2>Who We Are</h2>
              <p className="body-large">
                Established as a premier research institution, we bring together 
                distinguished scholars, innovative researchers, and dedicated professionals 
                from diverse disciplines to tackle complex global challenges.
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Our institution serves as a hub for intellectual discourse, where cutting-edge 
                research meets practical application. We foster an environment of academic 
                excellence, encouraging critical thinking and collaborative problem-solving 
                across traditional disciplinary boundaries.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Through our commitment to rigorous scholarship and evidence-based inquiry, 
                we contribute meaningfully to the advancement of human knowledge and the 
                betterment of society.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center space-y-2">
              <div className="text-3xl font-serif font-semibold text-primary">150+</div>
              <div className="text-sm text-muted-foreground">Research Fellows</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-serif font-semibold text-primary">25+</div>
              <div className="text-sm text-muted-foreground">Countries Represented</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-serif font-semibold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Publications</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-serif font-semibold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Research Teams</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;