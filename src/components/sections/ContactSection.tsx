
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Globe, MapPin } from "lucide-react";

const contactInfo = [
  {
    icon: <MapPin className="h-6 w-6 text-primary" />,
    label: "Address",
    value: "Woodberry Down, London N4 2TG",
    href: "https://maps.google.com/?q=Woodberry+Down,+London+N4+2TG",
  },
  {
    icon: <Globe className="h-6 w-6 text-primary" />,
    label: "Website",
    value: "website.com",
    href: "https://website.com",
  },
  {
    icon: <Mail className="h-6 w-6 text-primary" />,
    label: "Email",
    value: "test@test.com",
    href: "mailto:test@test.com",
  },
  {
    icon: <Phone className="h-6 w-6 text-primary" />,
    label: "Phone",
    value: "111-1222-3333",
    href: "tel:11112223333",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-background/95">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary font-headline">Get In Touch</h2>
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-primary font-headline">Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-6">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{item.label}</h3>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-colors duration-300"
                    >
                      {item.value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
