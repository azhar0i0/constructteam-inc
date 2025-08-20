import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, Sparkles, FileText, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/5">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ConstructTeam INC
                </h1>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional construction estimates made simple. Create detailed estimates, 
              track your projects, and grow your business with our powerful estimation tools.
            </p>
            <Badge variant="secondary" className="mt-4 bg-primary/10 text-primary border-primary/20">
              Professional Estimation Platform
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Create New */}
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-secondary/20 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Create New Estimate</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Start fresh with a new construction estimate. Our step-by-step wizard 
                makes it easy to create professional estimates in minutes.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>Professional templates</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Client management</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Quick service library</span>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/create')}
                className="w-full shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                Get Started
                <Plus className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Recent Estimates */}
          <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-secondary/20 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Recent Estimates</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Access your previously created estimates. Review, duplicate, or 
                continue working on your saved projects.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>Quick access to history</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4 text-accent" />
                  <span>Duplicate estimates</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-accent" />
                  <span>Client history</span>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/recent')}
                variant="outline"
                className="w-full shadow-lg hover:shadow-xl transition-all duration-300 border-accent/30 hover:border-accent"
                size="lg"
              >
                View Recent
                <Clock className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-primary/10">
              <div className="text-2xl font-bold text-primary mb-1">Fast</div>
              <div className="text-sm text-muted-foreground">Create estimates in minutes</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-accent/10">
              <div className="text-2xl font-bold text-accent mb-1">Professional</div>
              <div className="text-sm text-muted-foreground">Impress your clients</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 border border-primary/10">
              <div className="text-2xl font-bold text-primary mb-1">Organized</div>
              <div className="text-sm text-muted-foreground">Keep track of everything</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};